# Nubble Mobile App

A social media mobile application built with React Native and Expo.

## Features

- Home feed with posts and stories
- User profiles
- Search functionality 
- Notifications
- New post creation

## Project Structure

```
src/
├── components/    # Reusable UI components
├── hooks/         # Custom React hooks
├── navigation/    # Navigation configuration
├── screens/       # App screens
│   ├── home/      # Home screen and related components
│   ├── newPost/   # New post creation screen
│   ├── notifications/ # Notifications screen
│   ├── profile/   # User profile screen
│   └── search/    # Search screen
├── theme/         # Theme configuration
└── types/         # TypeScript type definitions
```

## Theme Configuration

The app uses a consistent design system defined in `src/theme/theme.ts`, which includes:

- Colors
- Spacing
- Typography
- Border radius

## Navigation

The app uses React Navigation with:

- A bottom tab navigator for the main app sections
- A stack navigator for screen transitions

## Getting Started

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm start
   ```
4. Follow the instructions to run on iOS simulator, Android emulator, or physical device

## Development Guidelines

- Use the theme utilities for consistent styling
- Follow the component structure for new screens
- Add proper TypeScript types for all components