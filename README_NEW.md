# Advanced Web Scraper Platform

A comprehensive web scraping platform that can extract emails, phone numbers, contact information, social media links, and more from any website. Built with Flask and modern web technologies.

## 🌟 Features

### 🔍 Multiple Scraping Options
- **Email Extraction**: Find all email addresses on websites
- **Phone Numbers**: Extract phone numbers in various formats
- **Contact Information**: Locate contact forms, addresses, and contact pages
- **Social Media Links**: Find Facebook, Twitter, Instagram, LinkedIn, YouTube, TikTok links
- **All Links**: Extract all links from web pages
- **Everything**: Comprehensive scraping of all data types

### 📊 Export Options
- **CSV Export**: Download results in CSV format for easy analysis
- **JSON Export**: Get structured JSON data for API integration
- **Multiple Pages**: Scrape multiple pages with pagination support

### 🎨 Modern Web Interface
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Progress**: See scraping progress in real-time
- **File Management**: View and download previous scraping results
- **Beautiful UI**: Modern, intuitive interface with animations

### 🛡️ Advanced Features
- **Browser Mimicking**: Avoid detection with custom headers
- **Error Handling**: Robust error handling and recovery
- **Rate Limiting**: Built-in delays to be respectful to servers
- **Multiple Pagination Patterns**: Supports various pagination formats

## 🚀 Quick Start

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/1cbyc/1cbyc-web-scraper.git
   cd 1cbyc-web-scraper
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements_new.txt
   ```

3. **Run the application**
   ```bash
   python app_new.py
   ```

4. **Open your browser**
   Navigate to `http://localhost:5000`

### Usage

1. **Enter Website URL**: Input the website you want to scrape
2. **Choose Pages**: Select how many pages to scrape (1-50)
3. **Select Data Type**: Choose what type of data to extract
4. **Pick Format**: Select CSV or JSON output
5. **Start Scraping**: Click the button and wait for results
6. **Download**: Get your results in the chosen format

## 📋 Supported Data Types

### Email Addresses
- Standard email formats (user@domain.com)
- Multiple email patterns
- Duplicate removal

### Phone Numbers
- International formats
- US formats: (555) 123-4567, 555-123-4567
- 10-digit numbers
- Country code formats

### Contact Information
- Contact page detection
- Contact form identification
- Address extraction
- Office location finding

### Social Media Links
- Facebook
- Twitter/X
- Instagram
- LinkedIn
- YouTube
- TikTok

### All Links
- Internal links
- External links
- Link text extraction
- Domain categorization

## 🛠️ Technical Details

### Architecture
- **Backend**: Flask web framework
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Scraping**: BeautifulSoup4, Requests
- **Data Storage**: Local file system (CSV/JSON)
- **Deployment**: Heroku-ready with Procfile

### File Structure
```
1cbyc-web-scraper/
├── app_new.py              # Main Flask application
├── templates/
│   └── index_new.html      # Modern web interface
├── data/                   # Scraped data storage
├── requirements_new.txt    # Python dependencies
├── README_NEW.md          # This file
└── Procfile               # Heroku deployment
```

### API Endpoints

- `GET /` - Main web interface
- `POST /scrape` - Start scraping operation
- `GET /download/<filename>` - Download scraped data
- `GET /files` - List available files

## 🔧 Configuration

### Environment Variables
- `PORT`: Server port (default: 5000)
- `DEBUG`: Debug mode (default: True)

### Customization
You can modify the scraping behavior by editing `app_new.py`:
- Add new data extraction patterns
- Modify request headers
- Adjust scraping delays
- Add new export formats

## 📈 Performance Tips

1. **Limit Pages**: Start with 1-5 pages for testing
2. **Choose Specific Data**: Use targeted scraping instead of "Everything"
3. **Respect Robots.txt**: Check website's scraping policies
4. **Use Appropriate Delays**: Don't overwhelm servers

## 🚨 Legal and Ethical Considerations

### Important Notes
- **Respect robots.txt**: Always check website policies
- **Rate Limiting**: Built-in delays to be respectful
- **Educational Use**: Intended for educational purposes
- **Terms of Service**: Respect website terms of service
- **Data Privacy**: Be mindful of personal data extraction

### Best Practices
- Only scrape publicly available data
- Don't overload servers with requests
- Respect website terms of service
- Use for legitimate purposes only

## 🐛 Troubleshooting

### Common Issues

**"No data found"**
- Check if the URL is accessible
- Verify the website structure
- Try different pagination patterns

**"Network error"**
- Check internet connection
- Verify URL format
- Try with different websites

**"File not found"**
- Ensure data directory exists
- Check file permissions
- Restart the application

### Debug Mode
Run with debug mode for detailed error messages:
```bash
export FLASK_ENV=development
python app_new.py
```

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
3. **Make your changes**
4. **Test thoroughly**
5. **Submit a pull request**

### Areas for Improvement
- Add more data extraction patterns
- Implement database storage
- Add authentication system
- Create API endpoints
- Add scheduling capabilities
- Implement proxy support

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with Flask and BeautifulSoup4
- UI inspired by modern web design principles
- Thanks to the open-source community

## 📞 Support

If you encounter any issues or have questions:
- Create an issue on GitHub
- Check the troubleshooting section
- Review the documentation

---

**⚠️ Disclaimer**: This tool is for educational purposes only. Always respect website terms of service and robots.txt files. Use responsibly and ethically. 