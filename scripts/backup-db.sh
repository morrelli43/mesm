#!/bin/bash

# Database Backup Script for MESM
# Usage: ./backup-db.sh [environment]
# Environments: development, staging, production

set -e

ENVIRONMENT=${1:-development}
BACKUP_DIR="backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

echo "💾 Starting database backup for $ENVIRONMENT environment..."

# Create backup directory if it doesn't exist
mkdir -p $BACKUP_DIR

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

# Create backup filename
BACKUP_FILE="$BACKUP_DIR/${TIMESTAMP}_${ENVIRONMENT}.sql"

# Check if PostgreSQL tools are available
if ! command -v pg_dump &> /dev/null; then
    echo "❌ pg_dump not found! Please install PostgreSQL client tools."
    exit 1
fi

# Create database backup
echo "📊 Backing up database: $DB_NAME"
echo "🔗 Connection: $DB_USER@$DB_HOST:$DB_PORT"

PGPASSWORD=$DATABASE_PASSWORD pg_dump \
    -h $DB_HOST \
    -p $DB_PORT \
    -U $DB_USER \
    -d $DB_NAME \
    --verbose \
    --no-password \
    --format=custom \
    --file=$BACKUP_FILE

if [ $? -eq 0 ]; then
    echo "✅ Database backup completed successfully!"
    echo "📁 Backup saved to: $BACKUP_FILE"
    
    # Get backup file size
    BACKUP_SIZE=$(du -h $BACKUP_FILE | cut -f1)
    echo "📏 Backup size: $BACKUP_SIZE"
    
    # Keep only last 10 backups for this environment
    echo "🧹 Cleaning up old backups..."
    ls -t $BACKUP_DIR/*_${ENVIRONMENT}.sql 2>/dev/null | tail -n +11 | xargs rm -f 2>/dev/null || true
    
else
    echo "❌ Database backup failed!"
    exit 1
fi