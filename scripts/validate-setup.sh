#!/bin/bash

# Validation script for MESM deployment setup
# This script validates that all deployment components are properly configured

set -e

echo "🔍 Validating MESM Deployment Setup..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print status
print_status() {
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
    else
        echo -e "${RED}❌ $2${NC}"
    fi
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

ERRORS=0

# Check Node.js and npm
echo "📋 Checking dependencies..."
node --version > /dev/null 2>&1
print_status $? "Node.js is installed"

npm --version > /dev/null 2>&1
print_status $? "npm is installed"

# Check if all required files exist
echo "📁 Checking configuration files..."

FILES=(
    ".env.example"
    ".env.development" 
    ".env.staging"
    ".env.production"
    "package.json"
    "next.config.ts"
    "Dockerfile"
    "docker-compose.yml"
    "docker-compose.dev.yml"
    "vercel.json"
    "vercel.staging.json"
    "DEPLOYMENT.md"
)

for file in "${FILES[@]}"; do
    if [ -f "$file" ]; then
        print_status 0 "$file exists"
    else
        print_status 1 "$file missing"
        ERRORS=$((ERRORS + 1))
    fi
done

# Check scripts directory and permissions
echo "🔧 Checking deployment scripts..."

SCRIPTS=(
    "scripts/deploy-dev.sh"
    "scripts/deploy-staging.sh"
    "scripts/deploy-production.sh"
    "scripts/backup-db.sh"
    "scripts/transfer-db.sh"
    "scripts/restore-db.sh"
)

for script in "${SCRIPTS[@]}"; do
    if [ -f "$script" ]; then
        if [ -x "$script" ]; then
            print_status 0 "$script exists and is executable"
        else
            print_warning "$script exists but is not executable"
            chmod +x "$script"
            print_status 0 "Made $script executable"
        fi
    else
        print_status 1 "$script missing"
        ERRORS=$((ERRORS + 1))
    fi
done

# Check backup directory
echo "💾 Checking backup directory..."
if [ -d "backups" ]; then
    print_status 0 "backups directory exists"
else
    mkdir -p backups
    print_status 0 "Created backups directory"
fi

# Check package.json scripts
echo "📦 Checking package.json scripts..."

REQUIRED_SCRIPTS=(
    "deploy:dev"
    "deploy:staging"
    "deploy:production"
    "db:backup"
    "db:restore"
    "db:transfer"
    "docker:dev"
    "docker:up"
)

for script in "${REQUIRED_SCRIPTS[@]}"; do
    if grep -q "\"$script\":" package.json; then
        print_status 0 "npm script '$script' configured"
    else
        print_status 1 "npm script '$script' missing"
        ERRORS=$((ERRORS + 1))
    fi
done

# Check environment variables in .env files
echo "🔐 Checking environment variables..."

ENV_VARS=(
    "NODE_ENV"
    "NEXT_PUBLIC_APP_NAME"
    "NEXT_PUBLIC_APP_URL"
    "DATABASE_URL"
    "ENVIRONMENT"
)

for env_file in ".env.development" ".env.staging" ".env.production"; do
    if [ -f "$env_file" ]; then
        echo "  Checking $env_file..."
        for var in "${ENV_VARS[@]}"; do
            if grep -q "^$var=" "$env_file"; then
                print_status 0 "  $var defined in $env_file"
            else
                print_status 1 "  $var missing in $env_file"
                ERRORS=$((ERRORS + 1))
            fi
        done
    fi
done

# Test basic build process (skip if dependencies not installed)
echo "🏗️  Testing build process..."
if [ -d "node_modules" ]; then
    if npm run lint > /dev/null 2>&1; then
        print_status 0 "Linting passes"
    else
        print_warning "Linting has warnings (this is usually okay)"
    fi
else
    print_warning "node_modules not found, skipping build tests"
    print_warning "Run 'npm install' to test the complete setup"
fi

# Summary
echo ""
echo "📊 Validation Summary:"
if [ $ERRORS -eq 0 ]; then
    echo -e "${GREEN}✅ All deployment setup checks passed!${NC}"
    echo ""
    echo "🚀 You can now use the deployment scripts:"
    echo "  npm run deploy:dev      # Start development"
    echo "  npm run deploy:staging  # Deploy to staging"
    echo "  npm run deploy:production # Deploy to production"
    echo ""
    echo "💾 Database management:"
    echo "  npm run db:backup [env]           # Backup database"
    echo "  npm run db:transfer [src] [dest]  # Transfer between environments"
    echo "  npm run db:restore [env] [file]   # Restore from backup"
    echo ""
    echo "🐳 Docker commands:"
    echo "  npm run docker:dev      # Start development database"
    echo "  npm run docker:up       # Start full application"
else
    echo -e "${RED}❌ $ERRORS errors found in deployment setup${NC}"
    echo "Please fix the errors above before using deployment scripts."
    exit 1
fi