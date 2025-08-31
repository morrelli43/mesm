#!/bin/bash

# Database Transfer Script for MESM
# Usage: ./transfer-db.sh [source_env] [target_env]
# Example: ./transfer-db.sh production staging

set -e

SOURCE_ENV=${1:-production}
TARGET_ENV=${2:-staging}

echo "🔄 Starting database transfer from $SOURCE_ENV to $TARGET_ENV..."

# Validation
if [ "$SOURCE_ENV" = "$TARGET_ENV" ]; then
    echo "❌ Source and target environments cannot be the same!"
    exit 1
fi

# Confirmation for sensitive operations
if [ "$TARGET_ENV" = "production" ]; then
    echo "⚠️  WARNING: You are about to overwrite PRODUCTION database!"
    read -p "⚠️  Are you absolutely sure? Type 'OVERWRITE_PRODUCTION' to confirm: " confirm
    if [ "$confirm" != "OVERWRITE_PRODUCTION" ]; then
        echo "❌ Transfer cancelled."
        exit 1
    fi
fi

# Create backup of target before transfer
echo "💾 Creating backup of target environment ($TARGET_ENV) before transfer..."
./scripts/backup-db.sh $TARGET_ENV

# Create backup of source
echo "💾 Creating backup of source environment ($SOURCE_ENV)..."
./scripts/backup-db.sh $SOURCE_ENV

# Get the latest backup file for source
LATEST_BACKUP=$(ls -t backups/*_${SOURCE_ENV}.sql 2>/dev/null | head -n1)

if [ -z "$LATEST_BACKUP" ]; then
    echo "❌ No backup found for $SOURCE_ENV environment!"
    exit 1
fi

echo "📂 Using backup: $LATEST_BACKUP"

# Load target environment variables
if [ -f ".env.$TARGET_ENV" ]; then
    export $(cat .env.$TARGET_ENV | grep -v ^# | xargs)
else
    echo "❌ Environment file .env.$TARGET_ENV not found!"
    exit 1
fi

# Extract target database connection details
TARGET_DB_HOST=${DATABASE_HOST:-localhost}
TARGET_DB_PORT=${DATABASE_PORT:-5432}
TARGET_DB_NAME=${DATABASE_NAME}
TARGET_DB_USER=${DATABASE_USER}

echo "🗄️  Restoring to target database: $TARGET_DB_NAME"
echo "🔗 Target connection: $TARGET_DB_USER@$TARGET_DB_HOST:$TARGET_DB_PORT"

# Check if PostgreSQL tools are available
if ! command -v pg_restore &> /dev/null; then
    echo "❌ pg_restore not found! Please install PostgreSQL client tools."
    exit 1
fi

# Drop and recreate target database (be very careful here!)
echo "🗑️  Dropping target database (if exists)..."
PGPASSWORD=$DATABASE_PASSWORD dropdb \
    -h $TARGET_DB_HOST \
    -p $TARGET_DB_PORT \
    -U $TARGET_DB_USER \
    --if-exists \
    $TARGET_DB_NAME || true

echo "🆕 Creating target database..."
PGPASSWORD=$DATABASE_PASSWORD createdb \
    -h $TARGET_DB_HOST \
    -p $TARGET_DB_PORT \
    -U $TARGET_DB_USER \
    $TARGET_DB_NAME

# Restore from backup
echo "📥 Restoring database from backup..."
PGPASSWORD=$DATABASE_PASSWORD pg_restore \
    -h $TARGET_DB_HOST \
    -p $TARGET_DB_PORT \
    -U $TARGET_DB_USER \
    -d $TARGET_DB_NAME \
    --verbose \
    --no-password \
    $LATEST_BACKUP

if [ $? -eq 0 ]; then
    echo "✅ Database transfer completed successfully!"
    echo "📊 Database $SOURCE_ENV → $TARGET_ENV"
    echo "💾 Backup of original $TARGET_ENV saved in backups/"
else
    echo "❌ Database transfer failed!"
    echo "💡 You can restore the original $TARGET_ENV database from the backup if needed."
    exit 1
fi