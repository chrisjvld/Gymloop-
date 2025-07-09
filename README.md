# GymLoop++

A React Native fitness app built with Expo that uses AI to create personalized workout plans.

## Features

- **Authentication**: Secure user registration and login with Supabase
- **AI Workout Plans**: Personalized workout generation based on user preferences (coming soon)
- **Custom Plans**: Create your own workout routines (coming soon)
- **User Profiles**: Manage fitness goals, preferences, and injury history

## Tech Stack

- **Frontend**: React Native with Expo
- **Authentication & Database**: Supabase
- **Navigation**: React Navigation
- **AI Integration**: OpenAI API (coming soon)
- **Language**: TypeScript

## Project Structure

```
gymloop/
├── screens/           # All app screens
│   ├── LoginScreen.tsx
│   ├── SignUpScreen.tsx
│   ├── HomeScreen.tsx
│   ├── AIFormScreen.tsx
│   ├── PlanScreen.tsx
│   └── CustomPlanScreen.tsx
├── components/        # Shared React components
├── lib/              # Helper functions and API integrations
│   ├── supabase.ts   # Supabase configuration
│   └── openai.ts     # OpenAI integration (placeholder)
├── App.tsx           # Main app component with navigation
└── index.js          # App entry point
```

## Setup Instructions

### 1. Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- iOS Simulator (for iOS) or Android emulator (for Android)

### 2. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd gymloop

# Install dependencies
npm install
```

### 3. Supabase Configuration

1. Create a new project at [supabase.com](https://supabase.com)
2. Get your project URL and anon key from Settings > API
3. Update `lib/supabase.ts` with your credentials:

```typescript
const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';
```

### 4. Authentication Setup

The app uses Supabase's built-in authentication. No additional setup required - users can register and login once Supabase is configured.

### 5. Running the App

```bash
# Start the development server
npm start

# Or run on specific platform
npm run ios     # iOS simulator
npm run android # Android emulator
npm run web     # Web browser
```

## Current Features

### ✅ Implemented
- User authentication (login/signup)
- Home screen with navigation
- AI Plan form with user preferences
- Plan generation screen (placeholder)
- Custom plan screen (placeholder)

### 🚧 Coming Soon
- OpenAI integration for workout plan generation
- Custom workout creation
- Exercise tracking
- Progress monitoring
- Workout history

## Usage

1. **Sign Up/Login**: Create an account or login with existing credentials
2. **Choose Plan Type**: Select "Start AI Plan" or "Create Custom Plan"
3. **AI Plan Form**: Fill out your fitness preferences:
   - Gender, age, fitness goals
   - Workout frequency and session length
   - Injury history (optional)
4. **Plan Generation**: View your personalized workout plan (placeholder)

## Development Notes

- The app uses React Navigation for screen management
- Supabase handles authentication and will handle data storage
- TypeScript is used throughout for type safety
- The UI follows modern design principles with clean, accessible interfaces

## Future Enhancements

- OpenAI API integration for intelligent workout plan generation
- Exercise video demonstrations
- Progress tracking and analytics
- Social features and workout sharing
- Wearable device integration
- Offline mode support

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.
