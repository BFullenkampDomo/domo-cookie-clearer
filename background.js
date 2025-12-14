// Import utility functions
import { isValidDomoDomain } from './utils.js';

// Track recent errors to avoid showing notifications multiple times for the same error
const recentErrors = new Map();
const ERROR_COOLDOWN = 10000; // 10 seconds cooldown between notifications for same domain

/**
 * Shows a notification informing the user about a 431 error
 * @param {string} domain - The domain that received the error
 */
async function show431ErrorNotification(domain) {
  // Check if we've recently shown a notification for this domain
  const now = Date.now();
  const lastHandled = recentErrors.get(domain);
  
  if (lastHandled && (now - lastHandled) < ERROR_COOLDOWN) {
    console.log(`Skipping notification for ${domain} (recently shown)`);
    return;
  }
  
  // Validate domain is a Domo domain
  if (!isValidDomoDomain(domain)) {
    console.log(`Skipping notification for non-Domo domain: ${domain}`);
    return;
  }
  
  // Mark this domain as recently handled
  recentErrors.set(domain, now);
  
  // Update badge to show action needed
  chrome.action.setBadgeText({ text: '!' });
  chrome.action.setBadgeBackgroundColor({ color: '#f44336' });
  
  // Show informational notification (no action buttons)
  chrome.notifications.create({
    type: 'basic',
    iconUrl: 'icon48.png',
    title: 'Domo Cookie Clearer',
    message: `431 error detected on ${domain}. Click the extension icon to clear cookies.`,
    priority: 2
  }, (notificationId) => {
    if (chrome.runtime.lastError) {
      console.error('Error creating notification:', chrome.runtime.lastError);
    }
  });
}

// Listen for completed web requests
chrome.webRequest.onCompleted.addListener(
  (details) => {
    // Check for 431 status code
    if (details.statusCode === 431) {
      try {
        const url = new URL(details.url);
        const domain = url.hostname;
        show431ErrorNotification(domain);
      } catch (error) {
        console.error('Error parsing URL from 431 error:', error);
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

