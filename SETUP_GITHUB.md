# Setting Up This Extension on GitHub

Follow these steps to publish this extension to GitHub and prepare it for Chrome Web Store submission.

## Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon in the top right, then "New repository"
3. Repository name: `domo-cookie-clearer`
4. Description: "Chrome extension to clear Domo cookies and fix 431 errors"
5. Choose **Public** (required for Chrome Web Store)
6. **Do NOT** initialize with README, .gitignore, or license (we already have these)
7. Click "Create repository"

## Step 2: Initialize Git and Push

```bash
# Navigate to the extension directory
cd "/Users/braxton.fullenkamp/Downloads/domo-cookie-clearer 7"

# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: Domo Cookie Clearer v1.0.0"

# Add remote (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/domo-cookie-clearer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

## Step 3: Update URLs in Files

After pushing to GitHub, update these files with your actual GitHub username:

1. **README.md**: Replace `YOUR_USERNAME` with your GitHub username
2. **STORE_LISTING.md**: Replace `YOUR_USERNAME` with your GitHub username  
3. **PRIVACY_POLICY.md**: Replace `YOUR_USERNAME` with your GitHub username

You can use find/replace:
- Find: `YOUR_USERNAME`
- Replace: `your-actual-github-username`

## Step 4: Create GitHub Pages for Privacy Policy (Optional but Recommended)

1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under "Source", select **main branch** and **/ (root)**
4. Click **Save**
5. Your privacy policy will be available at:
   `https://YOUR_USERNAME.github.io/domo-cookie-clearer/PRIVACY_POLICY.md`

Or use the raw GitHub URL:
`https://raw.githubusercontent.com/YOUR_USERNAME/domo-cookie-clearer/main/PRIVACY_POLICY.md`

## Step 5: Verify All Files Are Present

Your repository should contain:
- ✅ manifest.json
- ✅ background.js
- ✅ popup.html
- ✅ popup.js
- ✅ utils.js
- ✅ icon16.png, icon48.png, icon128.png
- ✅ cookie-icon.png
- ✅ README.md
- ✅ PRIVACY_POLICY.md
- ✅ LICENSE
- ✅ CHANGELOG.md
- ✅ STORE_LISTING.md
- ✅ CONTRIBUTING.md
- ✅ .gitignore
- ✅ .github/ISSUE_TEMPLATE/ files

## Step 6: Prepare for Chrome Web Store

1. **Create screenshots**:
   - Extension popup (440x280 minimum)
   - Notification example
   - Success message
   - Badge indicator

2. **Prepare promotional images** (optional but recommended):
   - Small tile: 440x280
   - Large tile: 920x680
   - Marquee: 1400x560

3. **Get Privacy Policy URL**:
   - Use GitHub Pages URL or raw GitHub URL
   - Update in STORE_LISTING.md

## Step 7: Chrome Web Store Submission

1. Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole)
2. Pay the one-time $5 registration fee (if not already done)
3. Click "New Item"
4. Upload a ZIP file of your extension:
   ```bash
   # Create zip (exclude .git, .github, and docs)
   zip -r domo-cookie-clearer.zip . -x "*.git*" -x ".github/*" -x "*.md" -x "LICENSE" -x "SETUP_GITHUB.md" -x "STORE_LISTING.md" -x "cookie-icon.png"
   ```
5. Fill in store listing using information from `STORE_LISTING.md`
6. Add screenshots and promotional images
7. Add privacy policy URL
8. Submit for review

## Notes

- The extension code files (manifest.json, .js, .html, .png) should be in the root
- Documentation files (.md) are fine to include in the repo but you may want to exclude them from the ZIP
- Make sure to test the extension thoroughly before submission
- Review Chrome Web Store policies before submitting

## Troubleshooting

**Git push fails?**
- Make sure you've set up SSH keys or use HTTPS with a personal access token

**Privacy policy not accessible?**
- Make sure the file is in the repository
- Check that the URL is correct
- GitHub Pages may take a few minutes to update

**Need help?**
- Check GitHub documentation
- Review Chrome Web Store developer documentation

