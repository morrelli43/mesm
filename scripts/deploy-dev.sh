#!/bin/bash

# MESM Development Deployment Script
# This script sets up and runs the development environment

set -e

echo "🚀 Starting MESM Development Deployment..."

# Load development environment variables
export $(cat .env.development | grep -v ^# | xargs)

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Run database migrations (if applicable)
if command -v npx &> /dev/null && [ -f "prisma/schema.prisma" ]; then
    echo "🗄️  Running database migrations..."
    npx prisma generate
    npx prisma migrate dev --name init
elif [ -f "scripts/migrate-dev.sh" ]; then
    echo "🗄️  Running database migrations..."
    ./scripts/migrate-dev.sh
fi

# Start the development server
echo "🌐 Starting development server..."
npm run dev

echo "✅ Development deployment complete!"
echo "📱 Access your app at: $NEXT_PUBLIC_APP_URL"