# 🚀 Deployment Guide - Advanced Web Scraper Platform

This guide will help you deploy the **Advanced Web Scraper Platform** to Cloudflare Pages and Workers.

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Cloudflare account](https://dash.cloudflare.com/sign-up)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
# Install frontend dependencies
npm install

# Install Wrangler CLI globally
npm install -g wrangler
```

### 2. Configure Cloudflare Workers

1. **Login to Wrangler:**
   ```bash
   wrangler login
   ```

2. **Update `wrangler.toml`:**
   - Replace `your-kv-namespace-id` with your actual KV namespace ID
   - Create KV namespaces in Cloudflare dashboard if needed

3. **Deploy the Worker:**
   ```bash
   wrangler deploy
   ```

### 3. Configure Frontend API Endpoint

Update the API endpoint in `src/components/ScraperTool.jsx`:

```javascript
// Replace with your actual Cloudflare Worker URL
const response = await fetch('https://your-worker.your-subdomain.workers.dev/api/scrape', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(formData)
})
```

### 4. Build and Deploy Frontend

```bash
# Build the React app
npm run build

# Deploy to Cloudflare Pages
# Option 1: Using Wrangler
wrangler pages deploy dist

# Option 2: Using Cloudflare Dashboard
# 1. Go to Cloudflare Dashboard > Pages
# 2. Create new project
# 3. Connect your GitHub repository
# 4. Set build command: npm run build
# 5. Set build output directory: dist
```

## 🌐 Environment Variables

### Frontend (Cloudflare Pages)
- `VITE_API_URL`: Your Cloudflare Worker URL

### Backend (Cloudflare Workers)
- `SCRAPED_DATA`: KV namespace for storing scraped data

## 📁 Project Structure

```
advanced-web-scraper/
├── src/
│   ├── components/          # React components
│   ├── main.jsx            # App entry point
│   ├── App.jsx             # Main app component
│   └── index.css           # Global styles
├── src/worker.js           # Cloudflare Worker backend
├── wrangler.toml           # Worker configuration
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration
├── vite.config.js          # Vite configuration
└── _redirects              # Cloudflare Pages redirects
```

## 🔧 Development

### Local Development

```bash
# Start development server
npm run dev

# The app will be available at http://localhost:3000
```

### Testing the Worker Locally

```bash
# Start worker in development mode
wrangler dev

# Test the API endpoint
curl -X POST http://localhost:8787/api/scrape \
  -H "Content-Type: application/json" \
  -d '{"base_url":"https://example.com","num_pages":1,"scrape_type":"all"}'
```

## 🚀 Production Deployment

### 1. Frontend (Cloudflare Pages)

1. **Connect Repository:**
   - Go to Cloudflare Dashboard > Pages
   - Create new project
   - Connect your GitHub repository

2. **Build Settings:**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (leave empty)

3. **Environment Variables:**
   - `VITE_API_URL`: Your Cloudflare Worker URL

### 2. Backend (Cloudflare Workers)

1. **Create KV Namespace:**
   ```bash
   wrangler kv:namespace create "SCRAPED_DATA"
   ```

2. **Update Configuration:**
   - Copy the namespace ID to `wrangler.toml`

3. **Deploy:**
   ```bash
   wrangler deploy
   ```

## 🔒 Security Considerations

1. **Rate Limiting:** Implement rate limiting in your Worker
2. **CORS:** Configure CORS headers properly
3. **Input Validation:** Validate all user inputs
4. **Error Handling:** Implement proper error handling

## 📊 Monitoring

### Cloudflare Analytics
- Monitor requests in Cloudflare Dashboard
- Set up alerts for high error rates
- Track performance metrics

### Logs
```bash
# View worker logs
wrangler tail

# View specific logs
wrangler tail --format pretty
```

## 🔧 Troubleshooting

### Common Issues

1. **CORS Errors:**
   - Ensure CORS headers are set in the Worker
   - Check that the frontend URL is allowed

2. **Build Failures:**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **Worker Deployment Issues:**
   - Check `wrangler.toml` configuration
   - Verify KV namespace exists

### Debug Mode

```bash
# Enable debug logging
wrangler dev --debug

# Check worker status
wrangler whoami
```

## 📈 Performance Optimization

1. **Frontend:**
   - Enable code splitting
   - Optimize images
   - Use CDN for static assets

2. **Backend:**
   - Implement caching
   - Use Cloudflare's edge network
   - Optimize scraping algorithms

## 🔄 Updates and Maintenance

### Regular Updates
```bash
# Update dependencies
npm update

# Update Wrangler
npm update -g wrangler

# Redeploy after updates
npm run build
wrangler deploy
```

### Backup Strategy
- Regular backups of KV data
- Version control for all code
- Document configuration changes

## 🆘 Support

If you encounter issues:

1. Check the [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
2. Review [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/)
3. Check the project's GitHub issues
4. Contact support with specific error messages

---

**🎉 Congratulations!** Your Advanced Web Scraper Platform is now deployed and ready to use! 