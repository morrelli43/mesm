#!/bin/bash

# MESM Production Deployment Script
# This script builds and deploys to production environment

set -e

echo "🚀 Starting MESM Production Deployment..."

# Confirmation prompt for production deployment
read -p "⚠️  Are you sure you want to deploy to PRODUCTION? (yes/no): " confirm
if [ "$confirm" != "yes" ]; then
    echo "❌ Production deployment cancelled."
    exit 1
fi

# Load production environment variables
export $(cat .env.production | grep -v ^# | xargs)

# Install dependencies
echo "📦 Installing dependencies..."
npm ci --production=false

# Run linting
echo "🔍 Running linting..."
npm run lint

# Run tests (if available)
if npm run test --silent 2>/dev/null; then
    echo "🧪 Running tests..."
    npm run test
fi

# Backup production database before deployment
echo "💾 Creating database backup..."
./scripts/backup-db.sh production

# Run database migrations
if command -v npx &> /dev/null && [ -f "prisma/schema.prisma" ]; then
    echo "🗄️  Running database migrations for production..."
    npx prisma generate
    npx prisma migrate deploy
elif [ -f "scripts/migrate-production.sh" ]; then
    echo "🗄️  Running database migrations for production..."
    ./scripts/migrate-production.sh
fi

# Build the application
echo "🏗️  Building application..."
npm run build

# Deploy to Vercel (production)
if command -v vercel &> /dev/null; then
    echo "☁️  Deploying to Vercel production..."
    vercel --env .env.production --prod --confirm
else
    echo "⚠️  Vercel CLI not found. Installing..."
    npm install -g vercel
    vercel --env .env.production --prod --confirm
fi

echo "✅ Production deployment complete!"
echo "📱 Access your production app at: $NEXT_PUBLIC_APP_URL"
echo "💾 Database backup saved in: backups/$(date +%Y%m%d_%H%M%S)_production.sql"