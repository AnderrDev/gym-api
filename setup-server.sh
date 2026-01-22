#!/bin/bash

# AWS EC2 Server Setup Script for Ubuntu 22.04
# Run this script on a fresh EC2 instance

set -e

echo "🚀 Starting server setup..."

# Update system
echo "📦 Updating system packages..."
sudo apt update && sudo apt upgrade -y

# Install essential tools
echo "🔧 Installing essential tools..."
sudo apt install -y curl wget git build-essential

# Install Node.js 22.x via nvm
echo "📦 Installing Node.js..."
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm install 22
nvm use 22
nvm alias default 22

# Install PM2 globally
echo "📦 Installing PM2..."
npm install -g pm2

# Setup PM2 startup script
pm2 startup systemd -u $USER --hp $HOME
sudo env PATH=$PATH:/home/ubuntu/.nvm/versions/node/v22.*/bin pm2 startup systemd -u $USER --hp $HOME

# Install Nginx
echo "📦 Installing Nginx..."
sudo apt install -y nginx

# Install Certbot for SSL
echo "📦 Installing Certbot..."
sudo apt install -y certbot python3-certbot-nginx

# Configure firewall
echo "🔒 Configuring firewall..."
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw --force enable

# Create application directory
echo "📁 Creating application directory..."
mkdir -p ~/apps/gym-api
mkdir -p ~/apps/gym-api/logs

# Configure Git
echo "🔧 Configuring Git..."
git config --global user.name "Deploy Bot"
git config --global user.email "deploy@gym-api.com"

echo "✅ Server setup complete!"
echo ""
echo "Next steps:"
echo "1. Clone your repository: cd ~/apps && git clone https://github.com/AnderrDev/gym-api.git"
echo "2. Configure environment variables: cd gym-api && nano .env"
echo "3. Run deployment script: ./deploy.sh"
