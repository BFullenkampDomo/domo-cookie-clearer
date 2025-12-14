/**
 * Validates if a domain is a valid Domo domain
 * @param {string} domain - The domain to validate
 * @returns {boolean} - True if domain is a valid Domo domain
 */
function isValidDomoDomain(domain) {
  // Match domains following customer.domo.com pattern where customer is dynamic and may contain dashes
  // Examples: acme-corp.domo.com, test123.domo.com, my-company.domo.com
  // Prevents domain spoofing attacks like maliciousdomo.com
  const domoDomainPattern = /^[a-zA-Z0-9]([a-zA-Z0-9\-]*[a-zA-Z0-9])?\.domo\.com$/;
  return domoDomainPattern.test(domain);
}

/**
 * Clears cookies for a specific Domo domain
 * @param {string} domain - The Domo domain to clear cookies for
 * @returns {Promise<{removedCount: number, errors: string[]}>} - Result object with removed count and errors
 */
async function clearDomoCookies(domain) {
  // Validate domain is actually a Domo domain
  if (!isValidDomoDomain(domain)) {
    throw new Error(`Invalid Domo domain: ${domain}`);
  }

  // Get cookies for the specific domain and its parent domains
  // Query for exact domain match (without leading dot)
  const exactCookies = await chrome.cookies.getAll({ domain: domain });
  
  // Query for parent domain cookies (e.g., .domo.com wildcard cookies)
  // Extract parent domain (e.g., customer.domo.com -> domo.com)
  const domainParts = domain.split('.');
  const parentDomain = domainParts.length > 2 
    ? domainParts.slice(-2).join('.')  // Get last two parts (e.g., domo.com)
    : null;
  
  const parentCookies = parentDomain && parentDomain !== domain
    ? await chrome.cookies.getAll({ domain: parentDomain })
    : [];

  // Combine and deduplicate cookies
  const allCookies = [...exactCookies];
  const seen = new Set(exactCookies.map(c => `${c.name}:${c.domain}`));
  for (const cookie of parentCookies) {
    const key = `${cookie.name}:${cookie.domain}`;
    if (!seen.has(key)) {
      allCookies.push(cookie);
      seen.add(key);
    }
  }

  // Filter to only include cookies that match the domain
  // This handles both exact matches and wildcard cookies
  const domoCookies = allCookies.filter(cookie => {
    const cookieDomain = cookie.domain.startsWith('.') 
      ? cookie.domain.substring(1) 
      : cookie.domain;
    
    // Exact match
    if (cookieDomain === domain) {
      return true;
    }
    
    // Parent domain match (e.g., cookie for .domo.com matches customer.domo.com)
    if (domain.endsWith('.' + cookieDomain) || domain === cookieDomain) {
      return true;
    }
    
    return false;
  });

  // Remove each cookie
  let removedCount = 0;
  const errors = [];

  const removePromises = domoCookies.map(async (cookie) => {
    try {
      // Construct URL for cookie removal
      // Use the cookie's domain directly, handling leading dot
      let cookieDomain = cookie.domain;
      if (cookieDomain.startsWith('.')) {
        cookieDomain = cookieDomain.substring(1);
      }
      
      // Use https by default for Domo domains, fallback to http
      const protocol = cookie.secure !== false ? 'https:' : 'http:';
      const cookieUrl = `${protocol}//${cookieDomain}${cookie.path || '/'}`;
      
      const result = await chrome.cookies.remove({
        url: cookieUrl,
        name: cookie.name,
        storeId: cookie.storeId
      });
      
      if (result) {
        removedCount++;
      } else {
        errors.push(`Failed to remove: ${cookie.name}`);
      }
    } catch (err) {
      // Log full error to console for debugging
      console.error(`Error removing cookie ${cookie.name}:`, err);
      errors.push(`${cookie.name}: ${err.message || 'Unknown error'}`);
    }
  });

  await Promise.all(removePromises);

  return { removedCount, errors, totalCookies: domoCookies.length };
}

// Export functions for use in other modules
export { isValidDomoDomain, clearDomoCookies };

