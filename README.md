# SpeechFlow AI - Voice-to-Ticket POS Enhancement

## 🚀 Current Status: MVP Phase 1 - **PITCH READY!**

A React Native/Expo app that enables voice-based order entry for POS systems in restaurants, coffee shops, and retail stores.

## 🎯 Ready to Demo?

**New to pitching?** → Read [QUICKSTART.md](QUICKSTART.md) (3 min setup)  
**Want pitch scripts?** → Read [PITCH_GUIDE.md](PITCH_GUIDE.md) (full guide)  
**Custom menu needed?** → Read [CUSTOM_MENU_GUIDE.md](CUSTOM_MENU_GUIDE.md)

## ✅ What's Been Built

### Core Features
- ✅ Voice recording interface with visual feedback
- ✅ Clean, professional UI for order entry
- ✅ Order review screen with itemized display
- ✅ **Demo mode with AI simulation** - No backend needed!
- ✅ **Customizable branding** - Set business name & color
- ✅ **Pre-loaded menu templates** - Coffee shop & QSR menus
- ✅ **Settings screen** - Easy customization for pitches
- ✅ Type-safe architecture with TypeScript
- ✅ State management with Zustand
- ✅ Modular POS adapter system (ready for Square, Toast, Clover)

### Project Structure
```
/src
  /components
    - VoiceRecorder.tsx    # Main voice recording component
  /screens
    - VoiceOrderScreen.tsx # Primary order entry screen
    - OrderReviewScreen.tsx # Order confirmation view
    - SettingsScreen.tsx   # Business customization for demos
  /services
    - VoiceAPI.ts          # API integration for Whisper/transcription
    - POSAdapter.ts        # POS system integrations
    - DemoService.ts       # AI simulation for pitches
  /store
    - orderStore.ts        # Global state management
  /types
    - Order.ts             # TypeScript type definitions
    - Menu.ts              # Menu configuration types
  /data
    - sampleMenus.ts       # Pre-loaded menu templates
```

## 🎬 Demo Mode (Perfect for Pitches!)

The app now includes a **fully functional demo mode** that simulates AI processing without requiring a backend. This is perfect for:

- ✅ Pitching to prospects
- ✅ Testing UI/UX
- ✅ Trade show demos
- ✅ Investor presentations

### How Demo Mode Works:

1. Voice is recorded (real audio)
2. Simulated "AI processing" with realistic delay (2 seconds)
3. Pre-configured order scenarios are shown (looks like real AI parsing)
4. Order appears on review screen with transcription
5. Can "send to POS" (shows success message)

**Toggle Demo Mode:** Settings → Demo Mode switch

## 🎨 Customization for Each Business

Before pitching to a prospect:

1. **Open Settings** (⚙️ button)
2. **Set Business Name** - Their exact name
3. **Set Brand Color** - Their hex color
4. **Load Menu Template** - Coffee shop or QSR
5. **Save Settings**

Now the app looks like it was built specifically for them!

## 🎯 Next Steps (To Complete MVP)

### Backend Integration
1. **Set up backend server** (Node.js/Express)
   - Deploy on Railway.app or Render.com
   - Implement `/api/voice/transcribe` endpoint
   - Implement `/api/voice/parse` endpoint

2. **Integrate OpenAI Whisper API**
   - Sign up: https://platform.openai.com/
   - Get API key
   - Implement audio transcription

3. **Build order parsing AI**
   - Use Claude or GPT-4 for natural language processing
   - Extract items, quantities, modifiers from text
   - Map to POS-compatible format

### POS Integration
1. **Choose starting POS system**
   - Recommended: Square (best API docs)
   - Alternative: Toast, Clover

2. **Implement real POS adapter**
   - Complete Square integration in `POSAdapter.ts`
   - Test order submission
   - Handle errors and edge cases

### Testing & Refinement
1. **Test voice recording** on actual device
2. **Refine UI/UX** based on user feedback
3. **Add error handling** for network issues
4. **Implement order editing** functionality

## 🛠 Installation & Setup

### Prerequisites
- Node.js 18+ installed
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (Mac) or Android Emulator

### Running the App

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run in web browser
npm run web
```

### Environment Setup

Create `.env` file:
```
EXPO_PUBLIC_API_URL=http://localhost:3000
```

## 📱 Testing on Device

1. **Install Expo Go** on your phone
   - iOS: https://apps.apple.com/app/expo-go/id982107779
   - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

2. **Scan QR code** from terminal after running `npm start`

3. **Grant microphone permissions** when prompted

## 🔧 Configuration

### POS System Setup

In `src/services/POSAdapter.ts`, configure your POS:

```typescript
// For Square
export const posAdapter = createPOSAdapter('square', {
  apiKey: 'YOUR_SQUARE_API_KEY',
  locationId: 'YOUR_LOCATION_ID',
});

// For testing
export const posAdapter = createPOSAdapter('mock');
```

## 📊 Business Model (Per Plan)

- **Pricing:** $150/month per terminal
- **Setup Fee:** $500 onboarding
- **Target:** 67 terminals = $10,000/month
- **Market:** Quick-service restaurants, coffee shops

## 🏗 Development Roadmap

### Phase 1: MVP (Weeks 1-8) ← YOU ARE HERE
- [x] Basic voice recording
- [x] UI screens
- [ ] Backend API integration
- [ ] Whisper API connection
- [ ] Order parsing logic
- [ ] Mock POS integration

### Phase 2: Pilot (Weeks 9-16)
- [ ] Real POS integration (Square)
- [ ] Enhanced NLP for complex orders
- [ ] Error correction UI
- [ ] Analytics dashboard
- [ ] Payment system (Stripe)
- [ ] 5 beta customers

### Phase 3: Scale (Weeks 17-24)
- [ ] Multiple POS integrations
- [ ] White-label capability
- [ ] Marketing website
- [ ] Customer portal
- [ ] 67+ paying customers

## 🔑 Key Files to Customize

1. **VoiceOrderScreen.tsx** - Main user interface
2. **VoiceAPI.ts** - Backend API endpoints
3. **POSAdapter.ts** - POS system integration
4. **orderStore.ts** - State management logic

## 📝 API Backend (To Build)

### Required Endpoints

```javascript
// POST /api/voice/transcribe
// Upload audio file, return text transcription

// POST /api/voice/parse
// Input: transcription text
// Output: structured order JSON

// POST /api/pos/send-order
// Send parsed order to POS system
```

### Recommended Stack
- **Framework:** Express.js or Fastify
- **Database:** PostgreSQL (orders, customers)
- **Cache:** Redis (for speed)
- **Hosting:** Railway.app or Render.com
- **AI:** OpenAI API (Whisper + GPT-4)

## 💰 Cost Estimates (Monthly)

- Hosting: $200
- OpenAI API: $300-500
- Stripe fees: ~$300
- Marketing: $500
- **Total: ~$1,500-1,800/month**

**Break-even:** 10 customers × $150 = $1,500

## 📞 Support & Next Actions

### This Week's Tasks
1. ✅ Set up Expo project
2. ✅ Build core UI components
3. ⏳ Build backend API
4. ⏳ Integrate Whisper API
5. ⏳ Test end-to-end voice → order flow

### Quick Wins
- Test the recording UI (works offline)
- Customize colors/branding
- Add your logo to `/assets`
- Prepare demo video for customers

## 🐛 Known Issues & Todos

- [ ] Audio playback feature (not yet implemented)
- [ ] Network error handling
- [ ] Offline mode
- [ ] Order history persistence
- [ ] User authentication

## 📚 Resources

### Pitch & Demo Guides
- **[QUICKSTART.md](QUICKSTART.md)** - Get pitch-ready in 3 minutes
- **[PITCH_GUIDE.md](PITCH_GUIDE.md)** - Complete pitch script & objection handling  
- **[CUSTOM_MENU_GUIDE.md](CUSTOM_MENU_GUIDE.md)** - Add any business's menu

### Technical Documentation
- [Expo Audio Docs](https://docs.expo.dev/versions/latest/sdk/audio/)
- [OpenAI Whisper API](https://platform.openai.com/docs/guides/speech-to-text)
- [Square API Docs](https://developer.squareup.com/docs)
- [React Navigation](https://reactnavigation.org/)

---

**Built with:** Expo SDK 54, React Native, TypeScript, Zustand

**Goal:** $10,000/month SaaS revenue through B2B POS enhancement
