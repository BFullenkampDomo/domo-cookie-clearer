// Import utility functions
import { isValidDomoDomain } from './utils.js';

// Track recent errors to avoid updating badge multiple times for the same error
const recentErrors = new Map();
const ERROR_COOLDOWN = 10000; // 10 seconds cooldown between badge updates for same domain

/**
 * Updates the badge when a 431 error is detected
 * @param {string} domain - The domain that received the error
 */
async function handle431Error(domain) {
  // Check if we've recently handled a 431 for this domain
  const now = Date.now();
  const lastHandled = recentErrors.get(domain);
  
  if (lastHandled && (now - lastHandled) < ERROR_COOLDOWN) {
    return;
  }
  
  // Validate domain is a Domo domain
  if (!isValidDomoDomain(domain)) {
    return;
  }
  
  // Mark this domain as recently handled
  recentErrors.set(domain, now);
  
  // Update badge to show action needed
  try {
    await chrome.action.setBadgeText({ text: '!' });
    await chrome.action.setBadgeBackgroundColor({ color: '#f44336' });
  } catch (error) {
    console.error('[431 Detection] Error setting badge:', error);
  }
}

// Listen for completed web requests
chrome.webRequest.onCompleted.addListener(
  (details) => {
    // Check for 431 status code
    if (details.statusCode === 431) {
      try {
        const url = new URL(details.url);
        const domain = url.hostname;
        handle431Error(domain);
      } catch (error) {
        console.error('[431 Detection] Error parsing URL from 431 error:', error);
      }
    }
  },
  {
    urls: ['*://*.domo.com/*']
  },
  ['responseHeaders']
);

// Clean up old entries from recentErrors map periodically
setInterval(() => {
  const now = Date.now();
  for (const [domain, timestamp] of recentErrors.entries()) {
    if (now - timestamp > ERROR_COOLDOWN * 2) {
      recentErrors.delete(domain);
    }
  }
}, ERROR_COOLDOWN * 2);

// Clear badge when extension icon is clicked (user might be checking manually)
chrome.action.onClicked.addListener((tab) => {
  // Only clear badge if popup is not being shown
  // (This is a fallback - normally the popup handles this)
  chrome.action.setBadgeText({ text: '' });
});

