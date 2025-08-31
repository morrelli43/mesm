#!/bin/bash

# Database Restore Script for MESM
# Usage: ./restore-db.sh [environment] [backup_file]

set -e

ENVIRONMENT=${1:-development}
BACKUP_FILE=${2}

echo "📥 Starting database restore for $ENVIRONMENT environment..."

# Validate backup file
if [ -z "$BACKUP_FILE" ]; then
    echo "📋 Available backups for $ENVIRONMENT:"
    ls -la backups/*_${ENVIRONMENT}.sql 2>/dev/null || echo "No backups found for $ENVIRONMENT"
    echo ""
    echo "Usage: ./restore-db.sh [environment] [backup_file]"
    echo "Example: ./restore-db.sh development backups/20231201_120000_development.sql"
    exit 1
fi

if [ ! -f "$BACKUP_FILE" ]; then
    echo "❌ Backup file not found: $BACKUP_FILE"
    exit 1
fi

# Load environment variables
if [ -f ".env.$ENVIRONMENT" ]; then
    export $(cat .env.$ENVIRONMENT | grep -v ^# | xargs)
else
    echo "❌ Environment file .env.$ENVIRONMENT not found!"
    exit 1
fi

# Extract database connection details
DB_HOST=${DATABASE_HOST:-localhost}
DB_PORT=${DATABASE_PORT:-5432}
DB_NAME=${DATABASE_NAME}
DB_USER=${DATABASE_USER}

echo "🗄️  Restoring to database: $DB_NAME"
echo "🔗 Connection: $DB_USER@$DB_HOST:$DB_PORT"
echo "📂 From backup: $BACKUP_FILE"

# Confirmation for production
if [ "$ENVIRONMENT" = "production" ]; then
    echo "⚠️  WARNING: You are about to restore PRODUCTION database!"
    read -p "⚠️  Are you sure? Type 'RESTORE_PRODUCTION' to confirm: " confirm
    if [ "$confirm" != "RESTORE_PRODUCTION" ]; then
        echo "❌ Restore cancelled."
        exit 1
    fi
fi

# Create a backup before restore
echo "💾 Creating backup before restore..."
./scripts/backup-db.sh $ENVIRONMENT

# Check if PostgreSQL tools are available
if ! command -v pg_restore &> /dev/null; then
    echo "❌ pg_restore not found! Please install PostgreSQL client tools."
    exit 1
fi

# Drop and recreate database
echo "🗑️  Dropping database (if exists)..."
PGPASSWORD=$DATABASE_PASSWORD dropdb \
    -h $DB_HOST \
    -p $DB_PORT \
    -U $DB_USER \
    --if-exists \
    $DB_NAME || true

echo "🆕 Creating database..."
PGPASSWORD=$DATABASE_PASSWORD createdb \
    -h $DB_HOST \
    -p $DB_PORT \
    -U $DB_USER \
    $DB_NAME

# Restore from backup
echo "📥 Restoring database from backup..."
PGPASSWORD=$DATABASE_PASSWORD pg_restore \
    -h $DB_HOST \
    -p $DB_PORT \
    -U $DB_USER \
    -d $DB_NAME \
    --verbose \
    --no-password \
    $BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "✅ Database restore completed successfully!"
    echo "📊 Database: $DB_NAME"
    echo "📂 From: $BACKUP_FILE"
else
    echo "❌ Database restore failed!"
    exit 1
fi