#!/bin/bash

echo "🚀 Deploying Advanced Web Scraper Platform..."

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p data
mkdir -p templates

# Install dependencies
echo "📦 Installing dependencies..."
pip install -r requirements_new.txt

# Set environment variables
export FLASK_ENV=production
export PORT=5000

# Create Procfile for Heroku
echo "📄 Creating Procfile..."
echo "web: gunicorn app_new:app" > Procfile

# Set file permissions
echo "🔐 Setting permissions..."
chmod +x deploy_new.sh

# Start the application
echo "🌟 Starting Advanced Web Scraper Platform..."
echo "📍 Access the application at: http://localhost:5000"
echo "📊 Features available:"
echo "   - Email extraction"
echo "   - Phone number scraping"
echo "   - Contact information"
echo "   - Social media links"
echo "   - CSV/JSON export"
echo "   - Modern web interface"

python app_new.py 