#!/bin/bash
set -e

echo "🔄 Running database migrations..."
npx prisma migrate deploy

echo "✅ Migrations completed"
echo "🚀 Starting application..."

npm run start:prod
