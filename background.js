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
  console.log(`[431 Detection] Processing 431 error for domain: ${domain}`);
  
  // Check if we've recently shown a notification for this domain
  const now = Date.now();
  const lastHandled = recentErrors.get(domain);
  
  if (lastHandled && (now - lastHandled) < ERROR_COOLDOWN) {
    console.log(`[431 Detection] Skipping notification for ${domain} (recently shown ${Math.round((now - lastHandled) / 1000)}s ago)`);
    return;
  }
  
  // Validate domain is a Domo domain
  if (!isValidDomoDomain(domain)) {
    console.log(`[431 Detection] Skipping notification for non-Domo domain: ${domain}`);
    return;
  }
  
  // Mark this domain as recently handled
  recentErrors.set(domain, now);
  
  // Update badge to show action needed
  try {
    await chrome.action.setBadgeText({ text: '!' });
    await chrome.action.setBadgeBackgroundColor({ color: '#f44336' });
    console.log(`[431 Detection] Badge updated for ${domain}`);
  } catch (error) {
    console.error('[431 Detection] Error setting badge:', error);
  }
  
  // Get the icon URL using chrome.runtime.getURL for proper path resolution
  const iconUrl = chrome.runtime.getURL('icon48.png');
  console.log(`[431 Detection] Creating notification with icon: ${iconUrl}`);
  
  // Show informational notification (no action buttons)
  chrome.notifications.create({
    type: 'basic',
    iconUrl: iconUrl,
    title: 'Domo Cookie Clearer',
    message: `431 error detected on ${domain}. Click the extension icon to clear cookies.`,
    priority: 2,
    requireInteraction: true,  // Keep notification visible until user interacts
    silent: false  // Make sure it makes a sound/alert
  }, (notificationId) => {
    if (chrome.runtime.lastError) {
      console.error('[431 Detection] Error creating notification:', chrome.runtime.lastError);
      console.error('[431 Detection] Error details:', chrome.runtime.lastError.message);
    } else {
      console.log(`[431 Detection] Notification created successfully with ID: ${notificationId}`);
      console.log(`[431 Detection] Check your system notification center if you don't see it immediately`);
    }
  });
}

// Listen for completed web requests
chrome.webRequest.onCompleted.addListener(
  (details) => {
    // Log all requests to Domo domains for debugging (can be removed later)
    if (details.url.includes('domo.com')) {
      console.log(`[WebRequest] ${details.statusCode} ${details.method} ${details.url}`);
    }
    
    // Check for 431 status code
    if (details.statusCode === 431) {
      console.log(`[431 Detection] 431 error detected! URL: ${details.url}`);
      try {
        const url = new URL(details.url);
        const domain = url.hostname;
        console.log(`[431 Detection] Extracted domain: ${domain}`);
        show431ErrorNotification(domain);
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

// Log when the service worker starts
console.log('[Background] Service worker started. Listening for 431 errors on *.domo.com domains.');

// Test notification function (for debugging - can be called from console)
// To test: chrome.runtime.sendMessage({action: 'testNotification'})
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'testNotification') {
    console.log('[Test] Creating test notification...');
    const testDomain = 'test-customer.domo.com';
    show431ErrorNotification(testDomain);
    sendResponse({ success: true });
  }
  return true;
});

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

