# Authentication Setup

This application uses Better Auth for authentication with support for OAuth providers and email/password login.

## Environment Variables

Copy `.env.example` to `.env.local` and configure the following variables:

### Required for Basic Authentication
```
BETTER_AUTH_SECRET=your-super-secret-key-here-at-least-32-chars
DATABASE_URL=postgresql://username:password@localhost:5432/mesm_dev
```

### OAuth Provider Setup (Optional)

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized origins
6. Set environment variables:
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

#### Apple OAuth
1. Go to [Apple Developer Portal](https://developer.apple.com/)
2. Create a new App ID with Sign in with Apple capability
3. Create a Service ID
4. Configure domains and return URLs
5. Set environment variables:
```
APPLE_CLIENT_ID=your-apple-client-id
APPLE_CLIENT_SECRET=your-apple-client-secret
```

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/)
2. Create a new app
3. Add Facebook Login product
4. Configure OAuth redirect URIs
5. Set environment variables:
```
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret
```

## Database Setup

Better Auth requires database tables for users and sessions. The tables will be created automatically when you first start the application with a valid database connection.

## Testing Authentication

1. Start the development server: `npm run dev`
2. Visit `/login` to see the authentication page
3. Try accessing `/admin` to test route protection
4. Sign up or sign in with email/password or OAuth providers

## Features

- 🔐 Email/password authentication
- 🌐 Social OAuth (Google, Apple, Facebook)
- 🛡️ Protected admin routes
- 📱 Responsive login design
- 🔄 Session management with automatic refresh
- 👤 User profile management
- 🚪 Secure logout functionality