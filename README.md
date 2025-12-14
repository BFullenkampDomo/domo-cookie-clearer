# Domo Cookie Clearer

A Chrome extension that automatically detects 431 HTTP errors on Domo instances and helps you clear cookies with one click to resolve cookie conflicts when switching between multiple Domo customer instances.

![Chrome Web Store](https://img.shields.io/badge/Chrome-Extension-green?logo=google-chrome)
![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

## 🎯 Problem

When working with multiple Domo customer instances (e.g., `customer1.domo.com`, `customer2.domo.com`), cookie conflicts can cause **431 "Request Header Fields Too Large"** errors. This happens because cookies from different instances accumulate and exceed browser header size limits.

## ✨ Solution

Domo Cookie Clearer:
- **Automatically detects** 431 errors on Domo domains
- **Notifies you** when a 431 error occurs
- **One-click cookie clearing** for the specific Domo instance you're using
- **Privacy-focused**: All operations happen locally in your browser

## 🚀 Features

- ✅ Automatic 431 error detection
- ✅ Smart domain validation (only works on `customer.domo.com` patterns)
- ✅ One-click cookie clearing for current tab's domain
- ✅ Visual notifications when errors are detected
- ✅ Badge indicator on extension icon
- ✅ No data collection or external requests
- ✅ Manifest V3 compliant

## 📦 Installation

### From Chrome Web Store (Recommended)
[Coming soon - link will be added when published]

### Manual Installation (Developer Mode)

1. Download or clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable **Developer mode** (toggle in top-right corner)
4. Click **"Load unpacked"**
5. Select the extension folder
6. The extension icon should appear in your Chrome toolbar

## 📖 Usage

### Automatic Detection
1. Navigate to a Domo instance (e.g., `customer.domo.com`)
2. If a 431 error occurs, you'll receive a notification
3. Click the extension icon (it will show a "!" badge)
4. Click **"Clear Domo Cookies"** button
5. Cookies are cleared and the page reloads automatically

### Manual Clearing
1. Navigate to a Domo instance
2. Click the extension icon in your Chrome toolbar
3. Click the **"Clear Domo Cookies"** button
4. Done! The extension shows how many cookies were cleared

## 🔒 Privacy & Security

- **No data collection**: We don't collect, store, or transmit any user data
- **Scoped permissions**: Only accesses `*.domo.com` domains
- **Local operations**: All cookie clearing happens entirely within your browser
- **Open source**: Code is available for review

See our [Privacy Policy](PRIVACY_POLICY.md) for more details.

## 🛠️ Technical Details

### Permissions Explained

- **`cookies`**: Required to clear cookies for Domo domains
- **`activeTab`**: Required to identify the current Domo instance
- **`webRequest`**: Required to detect 431 HTTP errors on Domo domains
- **`tabs`**: Required to reload pages after clearing cookies
- **`notifications`**: Required to notify you when 431 errors are detected
- **Host Permissions (`*://*.domo.com/*`)**: Limited to Domo domains only

### Architecture

- **Manifest V3**: Uses the latest Chrome extension standard
- **Service Worker**: Background script for error detection
- **ES Modules**: Modern JavaScript module system
- **Domain Validation**: Regex-based validation for `customer.domo.com` pattern

## 📁 Project Structure

```
domo-cookie-clearer/
├── manifest.json          # Extension configuration
├── background.js          # Service worker for 431 detection
├── popup.html             # Extension popup UI
├── popup.js               # Popup logic and cookie clearing
├── utils.js              # Shared utility functions
├── icon16.png            # 16x16 icon
├── icon48.png            # 48x48 icon
├── icon128.png           # 128x128 icon
├── cookie-icon.png       # Source icon
├── README.md             # This file
├── PRIVACY_POLICY.md     # Privacy policy
├── LICENSE               # MIT License
└── CHANGELOG.md          # Version history
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

If you encounter any issues or have questions:
- Open an issue on GitHub
- Check existing issues for solutions

## 🙏 Acknowledgments

- Built for the Domo community
- Inspired by the need to easily manage multiple Domo instances

## 📄 Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history.

---

**Note**: This extension is not affiliated with or endorsed by Domo, Inc. It is an independent tool created to help users manage their Domo instances more effectively.

## 🔗 Links

- **Repository**: https://github.com/BFullenkampDomo/domo-cookie-clearer
- **Issues**: https://github.com/BFullenkampDomo/domo-cookie-clearer/issues
- **Privacy Policy**: https://github.com/BFullenkampDomo/domo-cookie-clearer/blob/main/PRIVACY_POLICY.md
