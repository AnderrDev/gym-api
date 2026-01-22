# Railway.app Configuration

## IMPORTANT: Use Nixpacks, NOT Docker

Railway should use **Nixpacks** builder, not Docker.

If Railway is trying to use a Dockerfile:
1. Go to Railway project settings
2. Find "Builder" or "Build" settings
3. Select **"Nixpacks"** instead of "Dockerfile"

## Configuration Files

- `nixpacks.toml` - Defines build and start commands
- `railway.json` - Railway-specific configuration
- `Procfile` - Process management (backup)

## Build Process

1. **Install**: `npm install`
2. **Generate**: `npx prisma generate`
3. **Build**: `npm run build`
4. **Start**: `npx prisma migrate deploy && npm run start:prod`

## Troubleshooting

### Error: "Can't reach database server during build"
**Cause**: Migrations running during build phase (no DB access)
**Solution**: Ensure using Nixpacks, not Dockerfile

### How to Force Nixpacks
In Railway dashboard:
- Settings → Builder → Select "Nixpacks"
- Or delete any Dockerfile in the repo
