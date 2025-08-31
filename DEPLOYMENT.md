# Deployment Scripts for MESM

This repository includes comprehensive deployment scripts for managing development, staging, and production environments efficiently.

## Quick Start

### Development Environment
```bash
# Start development environment
npm run deploy:dev

# Or with Docker
npm run docker:dev
```

### Staging Environment
```bash
# Deploy to staging
npm run deploy:staging
```

### Production Environment
```bash
# Deploy to production (with safety checks)
npm run deploy:production
```

## Environment Configuration

### Environment Files
- `.env.example` - Template for environment variables
- `.env.development` - Development configuration
- `.env.staging` - Staging configuration  
- `.env.production` - Production configuration

### Setting Up Environments

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env.development
   ```

2. **Update database credentials and other settings**

3. **For staging/production, create secure passwords and secrets**

## Database Management

### Backup Database
```bash
# Backup development database
npm run db:backup development

# Backup staging database  
npm run db:backup staging

# Backup production database
npm run db:backup production
```

### Transfer Database Between Environments
```bash
# Transfer production data to staging
npm run db:transfer production staging

# Transfer staging data to development
npm run db:transfer staging development
```

### Restore Database from Backup
```bash
# List available backups and restore
npm run db:restore development backups/20231201_120000_development.sql
```

## Docker Deployment

### Development with Docker
```bash
# Start development database
npm run docker:dev

# Stop development database
npm run docker:dev:down
```

### Full Application with Docker
```bash
# Build and start full application
npm run docker:build
npm run docker:up

# Stop application
npm run docker:down
```

## Vercel Deployment

### Prerequisites
1. Install Vercel CLI: `npm install -g vercel`
2. Login to Vercel: `vercel login`
3. Link project: `vercel link`

### Environment Variables in Vercel
Set these in your Vercel dashboard for each environment:

**Staging:**
- `NODE_ENV` = `production`
- `NEXT_PUBLIC_APP_NAME` = `MESM Staging`
- `NEXT_PUBLIC_APP_URL` = `https://your-staging-url.vercel.app`
- `DATABASE_URL` = `your-staging-database-url`
- `NEXTAUTH_SECRET` = `your-staging-secret`

**Production:**
- `NODE_ENV` = `production`
- `NEXT_PUBLIC_APP_NAME` = `MESM`
- `NEXT_PUBLIC_APP_URL` = `https://your-production-url.vercel.app`
- `DATABASE_URL` = `your-production-database-url`
- `NEXTAUTH_SECRET` = `your-production-secret`

## Deployment Scripts

### `scripts/deploy-dev.sh`
- Loads development environment
- Installs dependencies
- Runs database migrations
- Starts development server

### `scripts/deploy-staging.sh`
- Loads staging environment
- Runs linting
- Runs database migrations
- Builds application
- Deploys to Vercel staging

### `scripts/deploy-production.sh`
- Requires confirmation for safety
- Creates database backup
- Runs tests (if available)
- Runs linting and migrations
- Builds and deploys to production

### `scripts/backup-db.sh`
- Creates timestamped database backups
- Supports all environments
- Automatically cleans up old backups
- Uses PostgreSQL `pg_dump`

### `scripts/transfer-db.sh`
- Safely transfers data between environments
- Creates backups before transfer
- Requires confirmation for production operations
- Supports PostgreSQL databases

### `scripts/restore-db.sh`
- Restores database from backup files
- Lists available backups
- Creates backup before restore
- Requires confirmation for production

## Security Considerations

1. **Never commit `.env.*` files to version control**
2. **Use strong passwords and secrets for staging/production**
3. **Regularly backup production databases**
4. **Test transfers on staging before production**
5. **Use confirmation prompts for destructive operations**

## Database Setup

### PostgreSQL (Recommended)
1. Install PostgreSQL
2. Create databases for each environment
3. Update `.env.*` files with connection details
4. Run migrations using the deployment scripts

### Environment-Specific Databases
- Development: `mesm_development`
- Staging: `mesm_staging`
- Production: `mesm_production`

## Troubleshooting

### Common Issues

**Scripts not executable:**
```bash
chmod +x scripts/*.sh
```

**PostgreSQL tools missing:**
```bash
# Ubuntu/Debian
sudo apt-get install postgresql-client

# macOS
brew install postgresql
```

**Vercel CLI not found:**
```bash
npm install -g vercel
```

### Backup Location
All database backups are stored in the `backups/` directory with timestamps:
- Format: `YYYYMMDD_HHMMSS_environment.sql`
- Example: `20231201_143022_production.sql`

## Monitoring and Maintenance

1. **Regular Backups**: Schedule automatic backups for production
2. **Monitor Disk Space**: Database backups can grow large
3. **Update Dependencies**: Keep packages up to date
4. **Review Logs**: Monitor deployment and database logs
5. **Test Transfers**: Regularly test staging environment with production data

## Support

For issues with deployment scripts, please check:
1. Environment file configuration
2. Database connectivity
3. Required CLI tools installation
4. File permissions for scripts