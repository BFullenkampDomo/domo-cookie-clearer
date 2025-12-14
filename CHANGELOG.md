# Changelog

All notable changes to Domo Cookie Clearer will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-12-14

### Added
- Initial release
- Automatic 431 error detection on Domo domains
- One-click cookie clearing for current tab's domain
- Browser notifications when 431 errors are detected
- Badge indicator on extension icon
- Domain validation for `customer.domo.com` pattern
- Privacy-focused design with no data collection
- Manifest V3 compliance
- ES module architecture
- Comprehensive error handling
- User-friendly status messages

### Security
- Scoped permissions limited to Domo domains only
- Domain validation to prevent spoofing attacks
- Secure cookie querying (domain-specific, not all cookies)
- No external data transmission

### Technical
- Background service worker for error detection
- Shared utility functions for cookie clearing
- Proper error handling and user feedback
- Auto-hide status messages
- Cookie domain matching logic for exact and parent domains

