# 📱 Complete Deployment Guide - iOS & Android

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [App Store Preparation](#app-store-preparation)
4. [Building with EAS](#building-with-eas)
5. [iOS Deployment](#ios-deployment)
6. [Android Deployment](#android-deployment)
7. [Post-Deployment](#post-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

### Required Accounts

**1. Expo Account (Free)**
- Sign up: https://expo.dev
- Install EAS CLI: `npm install -g eas-cli`
- Login: `eas login`

**2. Apple Developer Account ($99/year)**
- Required for: iOS App Store submission
- Sign up: https://developer.apple.com/programs/
- Processing time: 1-2 days for approval
- Need: Apple ID, payment method, D-U-N-S number (optional for individuals)

**3. Google Play Developer ($25 one-time)**
- Required for: Android Play Store submission
- Sign up: https://play.google.com/console/signup
- Processing time: 24-48 hours
- Need: Google account, payment method

**4. Stripe Account (Free - for payments)**
- Sign up: https://stripe.com
- Complete verification (bank account, ID)
- Get API keys from dashboard

### Required Tools

```bash
# Install Node.js (if not already installed)
# Download from: https://nodejs.org (v18 or higher)

# Install Expo CLI globally
npm install -g expo-cli

# Install EAS CLI globally
npm install -g eas-cli

# Verify installations
expo --version
eas --version
```

---

## Pre-Deployment Checklist

### 1. Update App Configuration

**Edit `app.json`:**

```json
{
  "expo": {
    "name": "VoiceTicket",
    "slug": "voiceticket-pos",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#000000"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.yourcompany.voiceticket",
      "buildNumber": "1",
      "infoPlist": {
        "NSMicrophoneUsageDescription": "This app needs microphone access to record voice orders.",
        "NSCameraUsageDescription": "This app needs camera access to scan QR codes (optional feature)."
      }
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#000000"
      },
      "package": "com.yourcompany.voiceticket",
      "versionCode": 1,
      "permissions": [
        "android.permission.RECORD_AUDIO",
        "android.permission.MODIFY_AUDIO_SETTINGS"
      ]
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "plugins": [
      [
        "expo-av",
        {
          "microphonePermission": "Allow VoiceTicket to access your microphone to record voice orders."
        }
      ]
    ]
  }
}
```

**Important: Replace these values:**
- `com.yourcompany.voiceticket` → Your actual bundle ID/package name
- `VoiceTicket` → Your app name
- Permission descriptions → Your actual descriptions

---

### 2. Create App Assets

**Required Images:**

**App Icon (`assets/icon.png`):**
- Size: 1024×1024 px
- Format: PNG, no transparency
- Design: Your logo on solid background
- Tool: Canva.com (free template: "App Icon")

**iOS Icon:**
- Already handled by Expo if you provide 1024×1024 icon.png

**Android Adaptive Icon (`assets/adaptive-icon.png`):**
- Size: 1024×1024 px
- Safe zone: Keep important content in center 66% (684×684 px)
- Background color: Set in `app.json` → `android.adaptiveIcon.backgroundColor`

**Splash Screen (`assets/splash.png`):**
- Size: 1242×2436 px (or higher resolution)
- Format: PNG
- Design: Logo + app name centered

**Favicon (`assets/favicon.png`):**
- Size: 48×48 px (for web version)

**Quick Asset Creation:**
```bash
# Option 1: Use a designer on Fiverr ($20-50)
# Option 2: Use Canva templates (free)
# Option 3: Use this AI prompt in DALL-E/Midjourney:
"Minimalist app icon for voice ordering app, microphone symbol, 
black and white color scheme, modern, professional, 1024x1024"
```

---

### 3. Create Store Listing Assets

**App Screenshots (Required):**

**iOS (need 2-5 screenshots per device):**
- iPhone 6.7" (iPhone 15 Pro Max): 1290×2796 px
- iPhone 6.5" (iPhone 11 Pro Max): 1284×2778 px
- iPad Pro 12.9": 2048×2732 px (if supporting iPad)

**Android (need 2-8 screenshots):**
- Minimum: 320px on shortest side
- Maximum: 3840px on longest side
- Recommended: 1080×1920 px (phone) or 1200×1920 px

**How to Create Screenshots:**
1. Run app on simulator/emulator
2. Navigate to key screens (Voice Order, Order Review)
3. Take screenshots
4. Add text overlays in Figma/Canva:
   - "Record orders by voice"
   - "AI parses menu items instantly"
   - "Send directly to your POS"
   - "Serve 20% more customers"

**Promo Video (Optional but Recommended):**
- Length: 15-30 seconds
- Show: Voice recording → Parsed order → Sent to POS
- Add text: "Faster ordering. More customers. More revenue."
- Tool: Screen record on phone + edit in CapCut (free)

---

### 4. Write Store Listing Copy

**App Name (30 chars max):**
- iOS: "VoiceTicket - Voice Orders"
- Android: "VoiceTicket POS Voice AI"

**Subtitle/Short Description:**
- iOS (30 chars): "Speed up your POS with AI"
- Android (80 chars): "Take voice orders 5x faster. Serve more customers during rush hours."

**Description (4000 chars max):**

```
Serve 20% More Customers During Rush Hours Without Hiring More Staff

VoiceTicket is the fastest way for coffee shops, juice bars, and restaurants 
to take orders during busy hours. Say goodbye to long lines and frustrated 
customers.

HOW IT WORKS:
1. Hold your phone near the customer
2. They speak their order naturally
3. VoiceTicket instantly parses the order with AI
4. Sent directly to your POS system
5. Done in 5 seconds (instead of 30)

BENEFITS:
✅ Serve 20-50% more customers during peak hours
✅ Reduce order entry time by 83%
✅ Fewer errors (AI accuracy >95%)
✅ Less training needed for new staff
✅ Works with your existing POS (Square, Toast, Clover)

PERFECT FOR:
• Coffee shops & cafés
• Juice bars & smoothie shops
• Quick service restaurants
• Food trucks
• Any business with complex orders

ROI CALCULATION:
If you do 200 orders/day during rush hours:
- Save 25 seconds per order = 83 minutes saved
- Serve 21 extra customers = $137/day extra revenue
- $4,100/month additional income for just $150/month

INTEGRATIONS:
• Square POS
• Toast POS
• Clover POS
• More coming soon

FEATURES:
• Real-time voice transcription
• Intelligent order parsing
• Custom menu configuration
• Multi-location support
• Analytics dashboard
• Easy staff training (15 minutes)

PRICING:
$150/month per location. Free 60-day trial for new customers.

SECURITY & PRIVACY:
Your data is encrypted and secure. We don't store voice recordings 
or payment information.

Try VoiceTicket risk-free for 60 days and see how much more revenue 
you can generate during your busiest hours.

Questions? Support is available 7 days a week: support@voiceticket.com

---

VoiceTicket is built by restaurant operators for restaurant operators. 
We understand the pain of long lines during rush hours because we've 
been there.
```

**Keywords (iOS - 100 chars):**
```
pos,voice,order,restaurant,coffee,shop,ai,fast,quick,service,rush
```

**Keywords (Android - pick 5):**
- POS system
- Voice ordering
- Restaurant POS
- Coffee shop POS
- Order management

---

## App Store Preparation

### iOS App Store Connect Setup

**1. Create App Record:**
```
1. Go to: https://appstoreconnect.apple.com
2. Click "My Apps" → "+" → "New App"
3. Select:
   - Platform: iOS
   - Name: VoiceTicket
   - Primary Language: English (U.S.)
   - Bundle ID: com.yourcompany.voiceticket (must match app.json)
   - SKU: voiceticket-2026 (unique identifier)
   - User Access: Full Access
```

**2. Fill App Information:**
```
- Subtitle: "Speed up your POS with AI"
- Category: Primary: Business, Secondary: Productivity
- Content Rights: Check "Yes" (you own the content)
```

**3. Set Pricing:**
```
- Price: Free
- Availability: All countries
- In-App Purchases: (configure later if needed)
```

**4. Add Privacy URL:**
```
- Privacy Policy URL: https://yourwebsite.com/privacy
- Create at: termly.io (free policy generator)
```

**5. App Review Information:**
```
- First Name: [Your name]
- Last Name: [Your last name]
- Phone: [Your phone with country code]
- Email: [Your email]

Demo Account (if needed):
- Username: demo@test.com
- Password: Demo123!
- Notes: Log in with this account to test the app
```

**6. Age Rating:**
```
Complete questionnaire:
- Unrestricted Web Access: No
- Gambling: No
- Contests: No
- Result: 4+ (suitable for all ages)
```

---

### Google Play Console Setup

**1. Create App:**
```
1. Go to: https://play.google.com/console
2. Click "Create app"
3. Fill:
   - App name: VoiceTicket
   - Default language: English (United States)
   - App or game: App
   - Free or paid: Free
4. Check declarations and click "Create app"
```

**2. Set Up Store Listing:**
```
Go to "Store presence" → "Main store listing":
- Short description: (80 chars max)
- Full description: (4000 chars max)
- App icon: 512×512 PNG
- Feature graphic: 1024×500 PNG
- Screenshots: At least 2 (phone + optional tablet)
```

**3. Content Rating:**
```
Go to "Policy" → "App content" → "Content rating":
- Complete IARC questionnaire
- Select category: Utility/Productivity
- Questions about violence, sexual content, etc: All "No"
- Save questionnaire → Get rating (usually "Everyone")
```

**4. Target Audience:**
```
Go to "Policy" → "App content" → "Target audience":
- Age groups: 18+ (business audience)
```

**5. Privacy Policy:**
```
Go to "Policy" → "App content" → "Privacy policy":
- Add URL: https://yourwebsite.com/privacy
- Create at: termly.io
```

**6. Data Safety:**
```
Go to "Policy" → "App content" → "Data safety":
- Declare what data you collect:
  ✅ Audio files (for voice orders)
  ✅ Email address (for account)
  ❌ Location (not collected)
  ❌ Payment info (handled by Stripe, not stored by you)
- Purpose: App functionality
- Data sharing: Not shared with third parties
- Encryption: Data encrypted in transit
```

**7. App Access:**
```
If your app requires login:
- Go to "Testing" → "Internal testing"
- Add test email: demo@test.com / Demo123!
```

---

## Building with EAS

### 1. Configure EAS

**Login to EAS:**
```bash
eas login
```

**Link project:**
```bash
cd speechflowai
eas init
```

**Configure build profiles:**
The `eas.json` file is already created. Review it:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "ios": { "simulator": true },
      "android": { "buildType": "apk" }
    },
    "production": {
      "ios": { "resourceClass": "m-medium" },
      "android": { "buildType": "aab" }
    }
  }
}
```

---

### 2. Update Project for Backend

**Before building for production, update API URL:**

**Edit `src/services/VoiceAPI.ts`:**
```typescript
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'https://your-backend.com/api';
```

**Create `.env` file:**
```bash
EXPO_PUBLIC_API_URL=https://your-backend.railway.app/api
EXPO_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_...
```

**Install dotenv:**
```bash
npm install dotenv
```

**Update `app.json`:**
```json
{
  "expo": {
    "extra": {
      "apiUrl": process.env.EXPO_PUBLIC_API_URL
    }
  }
}
```

---

### 3. Build for iOS

**First time setup:**
```bash
eas build:configure
```

**Build for iOS production:**
```bash
eas build --platform ios --profile production
```

**What happens:**
1. EAS uploads your code to cloud
2. Builds app on macOS servers (15-30 minutes)
3. Notifies you when done
4. Provides download URL for `.ipa` file

**If prompted for credentials:**
- Select "Yes" to let EAS manage credentials automatically
- Or provide your own:
  - Distribution certificate
  - Provisioning profile
  - Push notification key (optional)

**Build output:**
```
✔ Build completed!
Download URL: https://expo.dev/artifacts/eas/...
Build ID: abc123...
```

---

### 4. Build for Android

**Build for Android production:**
```bash
eas build --platform android --profile production
```

**What happens:**
1. EAS builds `.aab` (Android App Bundle)
2. Takes 10-20 minutes
3. Provides download URL

**If prompted for keystore:**
- Select "Yes" to let EAS generate and manage it
- **IMPORTANT:** EAS stores your keystore. Don't lose access to your Expo account!

**Build output:**
```
✔ Build completed!
Download URL: https://expo.dev/artifacts/eas/...
Build ID: xyz789...
```

---

### 5. Test Builds Locally

**iOS (requires Mac):**
```bash
# Build for simulator
eas build --platform ios --profile preview

# Download and install in simulator
open -a Simulator
# Drag .app file into simulator
```

**Android:**
```bash
# Build APK for testing
eas build --platform android --profile preview

# Install on connected device
adb install path/to/app.apk
```

---

## iOS Deployment

### 1. Upload to App Store

**Option A: Use EAS Submit (Easiest)**
```bash
eas submit --platform ios --latest
```

**EAS will prompt for:**
- Apple ID: your-apple-id@example.com
- App-specific password: (generate at appleid.apple.com)
- ASC App ID: (found in App Store Connect URL)

**Option B: Manual Upload**
```bash
# Download .ipa from EAS
# Install Transporter app from Mac App Store
# Open Transporter → Add your .ipa
# Click Deliver
```

---

### 2. Configure App Store Connect

After upload completes:

```
1. Go to App Store Connect
2. Click your app → "iOS App"
3. Click version (e.g., "1.0 Prepare for Submission")
4. Add:
   - Screenshots (at least 2 per device size)
   - App description
   - Keywords
   - Support URL: https://yourwebsite.com/support
   - Marketing URL: https://yourwebsite.com (optional)
   - Privacy policy URL
5. Select build (uploaded via EAS/Transporter)
6. Complete age rating questionnaire
7. Answer export compliance: "No" (unless using encryption)
8. Click "Submit for Review"
```

---

### 3. App Review (24-48 hours)

**Apple will check:**
- App works as described
- No crashes
- Privacy policy exists
- Microphone permission is used appropriately
- Doesn't violate App Store guidelines

**Common rejection reasons:**
1. **Missing demo account** → Provide test login in review notes
2. **Microphone permission unclear** → Update description in `app.json`
3. **App crashes** → Test thoroughly before submission
4. **Copycat design** → Make sure your design is original
5. **Misleading claims** → Don't promise what app can't deliver

**If rejected:**
- Read rejection notes carefully
- Fix issues
- Submit new build: `eas build --platform ios`
- Resubmit

---

### 4. Release

**Once approved:**
```
1. App Store Connect → Your app
2. Status changes to "Ready for Sale"
3. You can set:
   - Release immediately (automatic)
   - Manual release (you click a button)
   - Scheduled release (specific date)
4. Click "Release This Version" (if manual)
```

**App is now live!** 🎉
- Appears in App Store within 2-24 hours globally
- Search: "VoiceTicket" or your app name
- Direct link: apps.apple.com/app/id[your-app-id]

---

## Android Deployment

### 1. Upload to Google Play

**Option A: Use EAS Submit**
```bash
eas submit --platform android --latest
```

**EAS will prompt for:**
- Google Service Account JSON (create below)

**Option B: Manual Upload**
```bash
# Download .aab from EAS
# Go to Play Console → Production → Create new release
# Upload .aab file
```

---

### 2. Create Google Service Account (for automated submission)

**Steps:**
```
1. Go to Google Cloud Console: console.cloud.google.com
2. Create new project: "VoiceTicket"
3. Enable Google Play Android Developer API:
   - APIs & Services → Library
   - Search "Google Play Android Developer API"
   - Enable
4. Create service account:
   - APIs & Services → Credentials
   - Create Credentials → Service Account
   - Name: "eas-submit"
   - Role: Service Account User
   - Create key → JSON
   - Download JSON file
5. Grant access in Play Console:
   - Play Console → Users and permissions
   - Invite user → Service account email
   - Permissions: Release manager
```

**Add to EAS:**
```bash
# Save JSON file as google-play-service-account.json
# Update eas.json with path (already done)
```

---

### 3. Configure Play Console Release

**Create production release:**
```
1. Play Console → Production
2. Create new release
3. Upload .aab (or it's already uploaded via EAS)
4. Set release name: "1.0 - Initial Release"
5. Release notes:
   "First release! Features:
   - Voice ordering with AI
   - Instant POS integration
   - Real-time order parsing
   - Custom menu support"
6. Review release → Roll out to production
```

---

### 4. Complete Remaining Requirements

**Before publishing, ensure completed:**
- ✅ Store listing (descriptions, screenshots)
- ✅ Content rating
- ✅ Target audience
- ✅ Privacy policy
- ✅ Data safety
- ✅ App access (if login required)

**Then:**
```
1. Click "Send for review"
2. Google reviews app (2-7 days, usually 2-3 days)
3. You get email when approved
4. App goes live automatically
```

---

### 5. Release Rollout

**Options:**
- **Staged rollout** (recommended for first release):
  - Starts at 20% of users
  - Monitor crashes/reviews
  - Increase to 50%, 100% gradually
  
- **Full rollout** (100% immediately)

**Monitoring:**
```
Play Console → Release dashboard:
- Crashes
- ANRs (App Not Responding)
- User reviews
- Install metrics
```

---

## Post-Deployment

### 1. Monitor Initial Launch

**First 24 hours:**
- Check for crash reports (Expo dashboard)
- Read user reviews (respond within 24 hours)
- Monitor install numbers
- Test on multiple devices if possible

**Tools:**
```
- Expo Dashboard: expo.dev/accounts/[you]/projects
- App Store Connect: Analytics → Metrics
- Play Console: Release → Production
- Sentry (optional): sentry.io for crash tracking
```

---

### 2. App Store Optimization (ASO)

**Week 1:**
- Monitor keyword rankings (tools: AppFollow, SensorTower)
- Adjust keywords based on search data
- Update screenshots if conversion is low

**Week 2:**
- A/B test app icon (use Play Store experiments)
- Test different descriptions
- Ask happy customers for 5-star reviews

**Ongoing:**
- Respond to all reviews (especially negative ones)
- Update screenshots with new features
- Localize to Spanish (huge market for restaurants)

---

### 3. Update Strategy

**Versioning:**
```
Semantic versioning: MAJOR.MINOR.PATCH
- 1.0.0 → Initial release
- 1.0.1 → Bug fixes
- 1.1.0 → New features
- 2.0.0 → Major changes
```

**How to release updates:**

**1. Update version:**
```json
// app.json
{
  "expo": {
    "version": "1.0.1",
    "ios": { "buildNumber": "2" },
    "android": { "versionCode": 2 }
  }
}
```

**2. Build new version:**
```bash
eas build --platform all --profile production
```

**3. Submit:**
```bash
eas submit --platform all --latest
```

**4. Release notes:**
```
iOS App Store Connect:
- Go to "1.0.1" version
- Add "What's New in This Version"
- Example: "Bug fixes and performance improvements"

Play Console:
- Create new release
- Add release notes
```

**Update frequency:**
- Bug fixes: As needed (within 24-48 hours)
- Features: Every 2-4 weeks
- Major updates: Every 3-6 months

---

### 4. OTA (Over-The-Air) Updates with Expo

**For small changes (JS/React code only):**

```bash
# Publish OTA update (no app store review needed)
expo publish

# Or use EAS Update
eas update --branch production --message "Fixed order parsing bug"
```

**When users open app:**
- Downloads new JS bundle automatically
- No App Store/Play Store approval needed
- Updates live in ~1 minute

**Limitations:**
- Can't update native code (Swift/Kotlin)
- Can't change app.json significantly
- Can't update permissions
- For those, need full build + store submission

---

### 5. Analytics Setup

**Recommended tools:**

**Mixpanel or Amplitude (user analytics):**
```bash
npm install @amplitude/analytics-react-native
# or
npm install mixpanel-react-native
```

**Track key events:**
```typescript
// VoiceOrderScreen.tsx
Mixpanel.track('Order Recorded', {
  orderTotal: order.total,
  itemCount: order.items.length,
  demoMode: demoMode
});
```

**Google Analytics (optional):**
```bash
expo install @react-native-firebase/analytics
```

**Key metrics to track:**
- Daily active users (DAU)
- Orders per day per user
- Average order value
- Session duration
- Crash-free rate (goal: >99%)

---

## Troubleshooting

### Common Build Errors

**Error: "Unable to find a suitable Xcode"**
```bash
# Solution: EAS will handle this automatically
# Or upgrade EAS build plan for faster machines
```

**Error: "Keystore not found"**
```bash
# Solution: Let EAS manage credentials
eas credentials

# Or provide your own keystore
eas build:configure
```

**Error: "Bundle ID already exists"**
```bash
# Solution: Change bundle ID in app.json
# Must be unique: com.yourcompany.voiceticket
# Not: com.example.app
```

**Error: "Microphone permission not declared"**
```bash
# Solution: Ensure app.json has:
"plugins": [
  ["expo-av", {
    "microphonePermission": "Allow VoiceTicket to access microphone"
  }]
]
```

---

### Common Submission Errors

**iOS: "Binary is invalid"**
- Check bundle ID matches App Store Connect
- Ensure all required icons are provided
- Try re-building: `eas build --platform ios --profile production`

**iOS: "Missing compliance"**
- Answer export compliance question
- If app uses HTTPS, answer "No" (standard encryption)

**Android: "Version code conflicts"**
- Each upload needs higher versionCode
- Update in app.json: `"versionCode": 2` (increment each time)

**Android: "API level not supported"**
- Ensure targeting Android 13+ (API 33)
- Check expo version is recent (SDK 50+)

---

### Performance Issues

**App is slow:**
- Enable Hermes engine (should be default)
- Optimize images (use WebP format, compress)
- Lazy load screens
- Use React.memo for expensive components

**Build is slow:**
- Use EAS priority builds (paid plan)
- Build on faster machines: `"resourceClass": "m-large"`
- Cache dependencies properly

**Crash rate high:**
- Add Sentry: `expo install @sentry/react-native`
- Monitor Expo crash logs
- Add error boundaries in React

---

## Checklist: Ready for Launch?

### Pre-Launch
- [ ] App icon created (1024×1024)
- [ ] Splash screen created
- [ ] Screenshots ready (5+ per platform)
- [ ] App description written
- [ ] Privacy policy URL live
- [ ] Support email set up
- [ ] Backend API deployed and tested
- [ ] Demo account created for app review
- [ ] All features tested on real devices

### iOS Ready
- [ ] Apple Developer account active ($99 paid)
- [ ] Bundle ID configured in app.json
- [ ] App record created in App Store Connect
- [ ] Age rating completed
- [ ] Pricing set (Free)
- [ ] App built successfully with EAS
- [ ] Test build works on simulator

### Android Ready
- [ ] Google Play Developer account active ($25 paid)
- [ ] Package name configured in app.json
- [ ] App created in Play Console
- [ ] Store listing complete
- [ ] Content rating received
- [ ] Data safety form filled
- [ ] App built successfully with EAS
- [ ] Test APK works on device

### Post-Launch
- [ ] Monitor crashes first 24 hours
- [ ] Respond to first reviews
- [ ] Share on social media
- [ ] Email existing beta customers
- [ ] Track install numbers
- [ ] Plan first update (bug fixes)

---

## Next Steps

**Week 1:**
1. ✅ Build production apps
2. ✅ Submit to both stores
3. ✅ Wait for approval (2-7 days)
4. 🎯 Prepare launch marketing
5. 🎯 Email waitlist/beta users

**Week 2:**
1. 🎯 App goes live!
2. 🎯 Share download links everywhere
3. 🎯 Monitor reviews and ratings
4. 🎯 Fix any critical bugs immediately
5. 🎯 Collect user feedback

**Month 1:**
1. 🎯 First update with fixes
2. 🎯 Add most-requested features
3. 🎯 Optimize based on analytics
4. 🎯 A/B test screenshots/description
5. 🎯 Hit 100+ downloads

---

## Resources

**Documentation:**
- Expo Docs: https://docs.expo.dev
- EAS Build: https://docs.expo.dev/build/introduction/
- EAS Submit: https://docs.expo.dev/submit/introduction/
- App Store Guidelines: https://developer.apple.com/app-store/review/guidelines/
- Play Store Policies: https://play.google.com/about/developer-content-policy/

**Tools:**
- App Icon Generator: https://appicon.co
- Screenshot Templates: https://previewed.app
- Privacy Policy Generator: https://termly.io
- ASO keyword tool: https://appfollow.io

**Communities:**
- r/reactnative
- r/expo
- Expo Discord: https://chat.expo.dev
- Indie Hackers: https://indiehackers.com

---

**Your app is ready to deploy. Now it's time to ship it to the world!** 🚀

Good luck! 🎉
