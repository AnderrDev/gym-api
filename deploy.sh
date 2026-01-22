#!/bin/bash

# Deployment script for gym-api
# Run this script to deploy or update the application

set -e

echo "🚀 Starting deployment..."

# Pull latest changes
echo "📥 Pulling latest changes from Git..."
git pull origin main

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Generate Prisma client
echo "🔧 Generating Prisma client..."
npx prisma generate

# Run database migrations
echo "🗄️  Running database migrations..."
npx prisma migrate deploy

# Build application
echo "🔨 Building application..."
npm run build

# Restart PM2
echo "🔄 Restarting application..."
pm2 reload ecosystem.config.js --update-env

# Save PM2 configuration
pm2 save

echo "✅ Deployment complete!"
echo ""
echo "Application status:"
pm2 status
echo ""
echo "View logs: pm2 logs gym-api"
echo "Monitor: pm2 monit"
