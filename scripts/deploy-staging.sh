#!/bin/bash

# MESM Staging Deployment Script
# This script builds and deploys to staging environment

set -e

echo "🚀 Starting MESM Staging Deployment..."

# Load staging environment variables
export $(cat .env.staging | grep -v ^# | xargs)

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Run linting
echo "🔍 Running linting..."
npm run lint

# Run database migrations
if command -v npx &> /dev/null && [ -f "prisma/schema.prisma" ]; then
    echo "🗄️  Running database migrations for staging..."
    npx prisma generate
    npx prisma migrate deploy
elif [ -f "scripts/migrate-staging.sh" ]; then
    echo "🗄️  Running database migrations for staging..."
    ./scripts/migrate-staging.sh
fi

# Build the application
echo "🏗️  Building application..."
npm run build

# Deploy to Vercel (staging)
if command -v vercel &> /dev/null; then
    echo "☁️  Deploying to Vercel staging..."
    vercel --env .env.staging --target staging --confirm
else
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
    vercel --env .env.staging --target staging --confirm
fi

echo "✅ Staging deployment complete!"
echo "📱 Access your staging app at: $NEXT_PUBLIC_APP_URL"