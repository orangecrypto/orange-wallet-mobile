# Orange Wallet Mobile

React Native cryptocurrency wallet for Bitcoin, Stacks, BRC-20, Ordinals, Runes, with DeFi features (Swap & Borrow/Loan).

## Tech Stack

- React Native 0.76.6
- TypeScript 5.0.4
- Redux Toolkit + Redux Persist
- React Navigation 7.x
- TanStack React Query 5.64.2
- @orangecryptohq/orangeseed

## Prerequisites

- Node.js >= 18
- React Native CLI
- Android Studio (for Android)
- Xcode (for iOS, macOS only)

## Setup

```bash
# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env and add your API keys

# Android
cd android && ./gradlew clean && cd ..
npm run android

# iOS
cd ios && pod install && cd ..
npm run ios
```

## Environment Variables

Required in `.env`:

```env
ORANGESEED_API_KEY=xxx          # Blockchain data (seed.orangewebservices.com)
COINGECKO_API_KEY=xxx           # Price data primary (api.coingecko.com)
ORANGE_MARKETCAP_API_KEY=xxx   # Price data fallback (api-orange-marketcap.orangewebservices.com)
```

## Project Structure

```
src/
├── components/       # Shared UI components
├── hooks/           # Custom hooks (45+)
├── redux/           # State management
├── screens/         # Screen components
├── services/        # API & business logic
└── utils/           # Utilities
```

## Scripts

```bash
npm start              # Metro bundler
npm run android        # Run Android
npm run ios            # Run iOS
npm test               # Tests
npm run lint           # Lint
```

## Key Features

- Bitcoin & Stacks support
- BRC-20 tokens
- Ordinals (NFTs)
- Runes
- Token swaps (DotSwap, RuneDex)
- Borrow/Loan (Liquidium)
- Mainnet/Testnet toggle

## Troubleshooting

**Env vars not working?**
```bash
cd android && ./gradlew clean && cd .. && npm run android
```

**Metro issues?**
```bash
npm start --reset-cache
```
