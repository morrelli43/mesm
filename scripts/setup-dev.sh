#!/bin/bash

# MESM Development Setup Script
# This script helps set up the development environment for testing the login functionality

echo "🚀 Setting up MESM Development Environment..."

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local file..."
    cp .env.development .env.local
    echo "✅ Created .env.local from .env.development"
else
    echo "✅ .env.local already exists"
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Check if dev.db exists
if [ -f "dev.db" ]; then
    echo "🗄️  SQLite database already exists"
else
    echo "🗄️  SQLite database will be created on first auth request"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Start development server: npm run dev"
echo "2. Visit http://localhost:3000/login"
echo "3. Click 'Sign up' and create test user:"
echo "   - Email: test@test.com"
echo "   - Password: test"
echo "   - Full Name: Test User"
echo "4. After signup, you can login and access /admin"
echo ""
echo "🔧 If you encounter database errors:"
echo "   - Restart the server: npm run dev"
echo "   - Check that .env.local has BETTER_AUTH_SECRET"
echo ""
echo "📚 See TEST_USER_SETUP.md for detailed instructions"