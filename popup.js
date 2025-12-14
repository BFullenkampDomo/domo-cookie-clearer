// Import utility functions
import { clearDomoCookies, isValidDomoDomain } from './utils.js';

document.getElementById('clearBtn').addEventListener('click', async () => {
  const statusDiv = document.getElementById('status');
  const button = document.getElementById('clearBtn');
  
  try {
    button.disabled = true;
    button.textContent = 'Clearing...';
    
    // Get the current active tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
    if (!tab || !tab.url) {
      statusDiv.textContent = 'X Could not get active tab';
      statusDiv.className = 'error';
      statusDiv.style.display = 'block';
      button.disabled = false;
      button.textContent = 'Clear Domo Cookies';
      // Auto-hide error after 5 seconds
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 5000);
      return;
    }
    
    // Extract domain from URL
    const url = new URL(tab.url);
    const currentDomain = url.hostname;
    
    // Validate domain is a Domo domain
    if (!isValidDomoDomain(currentDomain)) {
      statusDiv.textContent = `X Current tab is not a Domo instance\n(${currentDomain})`;
      statusDiv.className = 'error';
      statusDiv.style.display = 'block';
      button.disabled = false;
      button.textContent = 'Clear Domo Cookies';
      // Auto-hide error after 5 seconds
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 5000);
      return;
    }
    
    statusDiv.textContent = `Clearing cookies for ${currentDomain}...`;
    statusDiv.className = 'success';
    statusDiv.style.display = 'block';
    
    // Clear cookies using the utility function
    const result = await clearDomoCookies(currentDomain);
    
    // Show result message
    if (result.errors.length === 0) {
      statusDiv.textContent = `Cleared ${result.removedCount} cookie${result.removedCount !== 1 ? 's' : ''} for\n${currentDomain}`;
      statusDiv.className = 'success';
      
      // Clear the badge
      chrome.action.setBadgeText({ text: '' });
      
      // Hide status after 3 seconds if successful
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 3000);
    } else {
      statusDiv.textContent = `Cleared ${result.removedCount}, ${result.errors.length} error${result.errors.length !== 1 ? 's' : ''}:\n${result.errors.slice(0, 3).join('\n')}`;
      statusDiv.className = 'error';
      // Auto-hide error after 5 seconds
      setTimeout(() => {
        statusDiv.style.display = 'none';
      }, 5000);
    }
    statusDiv.style.display = 'block';
    
    button.disabled = false;
    button.textContent = 'Clear Domo Cookies';
    
  } catch (error) {
    // Log full error to console for debugging
    console.error('Error clearing cookies:', error);
    
    // Show user-friendly error message
    statusDiv.textContent = `X Error: ${error.message || 'An unexpected error occurred'}`;
    statusDiv.className = 'error';
    statusDiv.style.display = 'block';
    
    button.disabled = false;
    button.textContent = 'Clear Domo Cookies';
    
    // Auto-hide error after 5 seconds
    setTimeout(() => {
      statusDiv.style.display = 'none';
    }, 5000);
  }
});
