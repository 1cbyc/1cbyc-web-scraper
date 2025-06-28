import os
import re
import csv
import json
import requests
from bs4 import BeautifulSoup
from flask import Flask, request, render_template, jsonify, send_file, redirect, url_for
from urllib.parse import urljoin, urlparse
import sqlite3
from datetime import datetime
import threading
import time

app = Flask(__name__)

# Ensure data directory exists
if not os.path.exists('data'):
    os.makedirs('data')

class WebScraper:
    def __init__(self):
        self.headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }
        self.session = requests.Session()
        self.session.headers.update(self.headers)
    
    def extract_emails(self, html_content):
        """Extract email addresses from HTML content"""
        email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        emails = re.findall(email_pattern, html_content)
        return list(set(emails))  # Remove duplicates
    
    def extract_phone_numbers(self, html_content):
        """Extract phone numbers from HTML content"""
        # Multiple phone number patterns
        patterns = [
            r'\+?[\d\s\-\(\)]{10,}',  # International format
            r'\(\d{3}\)\s*\d{3}-\d{4}',  # US format (555) 123-4567
            r'\d{3}-\d{3}-\d{4}',  # US format 555-123-4567
            r'\d{10}',  # 10 digits
            r'\+1\s*\d{3}\s*\d{3}\s*\d{4}',  # US with country code
        ]
        
        phone_numbers = []
        for pattern in patterns:
            matches = re.findall(pattern, html_content)
            phone_numbers.extend(matches)
        
        return list(set(phone_numbers))  # Remove duplicates
    
    def extract_links(self, soup, base_url):
        """Extract all links from the page"""
        links = []
        for link in soup.find_all('a', href=True):
            href = link.get('href')
            full_url = urljoin(base_url, href)
            text = link.get_text(strip=True)
            links.append({
                'url': full_url,
                'text': text,
                'domain': urlparse(full_url).netloc
            })
        return links
    
    def extract_social_media(self, soup, base_url):
        """Extract social media links"""
        social_patterns = {
            'facebook': r'facebook\.com',
            'twitter': r'twitter\.com|x\.com',
            'instagram': r'instagram\.com',
            'linkedin': r'linkedin\.com',
            'youtube': r'youtube\.com',
            'tiktok': r'tiktok\.com'
        }
        
        social_links = {}
        for platform, pattern in social_patterns.items():
            links = []
            for link in soup.find_all('a', href=True):
                href = link.get('href')
                if re.search(pattern, href, re.IGNORECASE):
                    full_url = urljoin(base_url, href)
                    links.append(full_url)
            if links:
                social_links[platform] = list(set(links))
        
        return social_links
    
    def extract_contact_info(self, soup, base_url):
        """Extract contact information"""
        contact_info = {
            'addresses': [],
            'contact_forms': [],
            'contact_pages': []
        }
        
        # Look for contact-related text
        contact_keywords = ['contact', 'about', 'address', 'location', 'office']
        
        for link in soup.find_all('a', href=True):
            href = link.get('href')
            text = link.get_text(strip=True).lower()
            
            if any(keyword in text for keyword in contact_keywords):
                full_url = urljoin(base_url, href)
                contact_info['contact_pages'].append({
                    'url': full_url,
                    'text': link.get_text(strip=True)
                })
        
        # Look for forms
        forms = soup.find_all('form')
        for form in forms:
            form_action = form.get('action', '')
            if form_action:
                full_url = urljoin(base_url, form_action)
                contact_info['contact_forms'].append(full_url)
        
        return contact_info
    
    def scrape_page(self, url, scrape_type='all'):
        """Scrape a single page based on the specified type"""
        try:
            response = self.session.get(url, timeout=10)
            response.raise_for_status()
            
            soup = BeautifulSoup(response.content, 'html.parser')
            html_content = response.text
            
            results = {
                'url': url,
                'title': soup.title.get_text(strip=True) if soup.title else '',
                'status': response.status_code,
                'timestamp': datetime.now().isoformat()
            }
            
            if scrape_type in ['all', 'emails']:
                results['emails'] = self.extract_emails(html_content)
            
            if scrape_type in ['all', 'phones']:
                results['phone_numbers'] = self.extract_phone_numbers(html_content)
            
            if scrape_type in ['all', 'links']:
                results['links'] = self.extract_links(soup, url)
            
            if scrape_type in ['all', 'social']:
                results['social_media'] = self.extract_social_media(soup, url)
            
            if scrape_type in ['all', 'contacts']:
                results['contact_info'] = self.extract_contact_info(soup, url)
            
            return results
            
        except Exception as e:
            return {
                'url': url,
                'error': str(e),
                'status': 'failed',
                'timestamp': datetime.now().isoformat()
            }
    
    def scrape_multiple_pages(self, base_url, num_pages, scrape_type='all'):
        """Scrape multiple pages"""
        all_results = []
        
        for page in range(1, num_pages + 1):
            # Try different pagination patterns
            page_urls = [
                f"{base_url}?page={page}",
                f"{base_url}/page/{page}",
                f"{base_url}{page}",
                f"{base_url}/p/{page}"
            ]
            
            for page_url in page_urls:
                result = self.scrape_page(page_url, scrape_type)
                if result.get('status') == 200:
                    all_results.append(result)
                    break
            else:
                # If no pagination worked, try the base URL
                if page == 1:
                    result = self.scrape_page(base_url, scrape_type)
                    all_results.append(result)
        
        return all_results

def save_to_csv(data, filename):
    """Save scraped data to CSV file"""
    csv_path = os.path.join('data', filename)
    
    with open(csv_path, 'w', newline='', encoding='utf-8') as csvfile:
        if not data:
            return csv_path
        
        # Determine the type of data and create appropriate CSV
        if 'emails' in data[0]:
            fieldnames = ['url', 'title', 'emails', 'timestamp']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            
            for item in data:
                writer.writerow({
                    'url': item.get('url', ''),
                    'title': item.get('title', ''),
                    'emails': '; '.join(item.get('emails', [])),
                    'timestamp': item.get('timestamp', '')
                })
        
        elif 'phone_numbers' in data[0]:
            fieldnames = ['url', 'title', 'phone_numbers', 'timestamp']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            
            for item in data:
                writer.writerow({
                    'url': item.get('url', ''),
                    'title': item.get('title', ''),
                    'phone_numbers': '; '.join(item.get('phone_numbers', [])),
                    'timestamp': item.get('timestamp', '')
                })
        
        else:
            # Generic CSV for all data types
            fieldnames = ['url', 'title', 'data_type', 'data_content', 'timestamp']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
            writer.writeheader()
            
            for item in data:
                for key, value in item.items():
                    if key not in ['url', 'title', 'timestamp', 'status']:
                        if isinstance(value, list):
                            content = '; '.join(str(v) for v in value)
                        else:
                            content = str(value)
                        
                        writer.writerow({
                            'url': item.get('url', ''),
                            'title': item.get('title', ''),
                            'data_type': key,
                            'data_content': content,
                            'timestamp': item.get('timestamp', '')
                        })
    
    return csv_path

def save_to_json(data, filename):
    """Save scraped data to JSON file"""
    json_path = os.path.join('data', filename)
    
    with open(json_path, 'w', encoding='utf-8') as jsonfile:
        json.dump(data, jsonfile, indent=2, ensure_ascii=False)
    
    return json_path

@app.route('/')
def index():
    return render_template('index_new.html')

@app.route('/scrape', methods=['POST'])
def scrape():
    try:
        data = request.get_json()
        base_url = data.get('base_url', '').strip()
        num_pages = int(data.get('num_pages', 1))
        scrape_type = data.get('scrape_type', 'all')
        output_format = data.get('output_format', 'csv')
        
        if not base_url:
            return jsonify({'error': 'URL is required'}), 400
        
        if not base_url.startswith(('http://', 'https://')):
            base_url = 'http://' + base_url
        
        # Create scraper instance
        scraper = WebScraper()
        
        # Start scraping
        results = scraper.scrape_multiple_pages(base_url, num_pages, scrape_type)
        
        if not results:
            return jsonify({'error': 'No data found or scraping failed'}), 400
        
        # Generate filename
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        domain = urlparse(base_url).netloc.replace('.', '_')
        filename = f"{domain}_{scrape_type}_{timestamp}.{output_format}"
        
        # Save data
        if output_format == 'csv':
            file_path = save_to_csv(results, filename)
        else:
            file_path = save_to_json(results, filename)
        
        return jsonify({
            'success': True,
            'filename': filename,
            'results_count': len(results),
            'download_url': f'/download/{filename}'
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/download/<filename>')
def download_file(filename):
    file_path = os.path.join('data', filename)
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    else:
        return jsonify({'error': 'File not found'}), 404

@app.route('/files')
def list_files():
    files = []
    if os.path.exists('data'):
        for file in os.listdir('data'):
            if file.endswith(('.csv', '.json')):
                file_path = os.path.join('data', file)
                file_stat = os.stat(file_path)
                files.append({
                    'name': file,
                    'size': file_stat.st_size,
                    'modified': datetime.fromtimestamp(file_stat.st_mtime).isoformat(),
                    'download_url': f'/download/{file}'
                })
    
    return jsonify(files)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True) 