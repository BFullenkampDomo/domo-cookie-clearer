# Notification Diagnostics

If notifications aren't working, follow these steps:

## Step 1: Check Chrome Notification Settings

1. Open Chrome
2. Go to: `chrome://settings/content/notifications`
3. Make sure "Sites can ask to send notifications" is **enabled**
4. Check if Chrome is in the "Not allowed" list - if so, remove it

## Step 2: Check System Notification Settings

### macOS:
1. System Settings → Notifications & Focus
2. Find "Google Chrome" in the list
3. Make sure notifications are **enabled**
4. Check "Allow Notifications" is ON

### Windows:
1. Settings → System → Notifications
2. Find "Google Chrome" 
3. Make sure it's **enabled**

## Step 3: Check Extension Service Worker

1. Go to `chrome://extensions`
2. Find "Domo Cookie Clearer"
3. Click "service worker" link (opens DevTools)
4. Look for errors in the console
5. Try running this in the console:
   ```javascript
   chrome.notifications.create({
     type: 'basic',
     iconUrl: chrome.runtime.getURL('icon48.png'),
     title: 'Test',
     message: 'Test notification'
   }, (id) => {
     console.log('Notification ID:', id);
     console.log('Error:', chrome.runtime.lastError);
   });
   ```

## Step 4: Reload Extension

1. Go to `chrome://extensions`
2. Find "Domo Cookie Clearer"
3. Click the reload icon (circular arrow)
4. Try the test notification again

## Step 5: Check Browser Console

1. Open the extension popup
2. Right-click in the popup → Inspect
3. Check the console for errors
4. Look for messages starting with `[431 Detection]`

## Common Issues:

- **"Notifications API not available"**: Extension needs to be reloaded
- **"Permission denied"**: Chrome or system notifications are blocked
- **No error but no notification**: System notifications might be in "Do Not Disturb" mode
- **Notification appears but disappears quickly**: Check system notification settings for duration

