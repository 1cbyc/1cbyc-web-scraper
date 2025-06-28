#!/usr/bin/env python3
"""
Test script for the Advanced Web Scraper Platform
"""

import requests
import json
import time

def test_scraper():
    """Test the scraping functionality"""
    
    # Test URL (using a simple website)
    test_url = "https://httpbin.org/html"
    
    print("🧪 Testing Advanced Web Scraper Platform...")
    print(f"📍 Test URL: {test_url}")
    
    # Test data
    test_data = {
        "base_url": test_url,
        "num_pages": 1,
        "scrape_type": "all",
        "output_format": "json"
    }
    
    try:
        # Send request to scraper
        response = requests.post(
            "http://localhost:5000/scrape",
            json=test_data,
            headers={"Content-Type": "application/json"},
            timeout=30
        )
        
        if response.status_code == 200:
            result = response.json()
            print("✅ Scraping test successful!")
            print(f"📊 Results: {result}")
            
            if result.get('success'):
                print(f"📁 File created: {result.get('filename')}")
                print(f"🔗 Download URL: {result.get('download_url')}")
            else:
                print(f"❌ Error: {result.get('error')}")
        else:
            print(f"❌ HTTP Error: {response.status_code}")
            print(f"Response: {response.text}")
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to the application")
        print("💡 Make sure the Flask app is running on localhost:5000")
    except Exception as e:
        print(f"❌ Test failed: {str(e)}")

def test_file_listing():
    """Test the file listing functionality"""
    
    print("\n📋 Testing file listing...")
    
    try:
        response = requests.get("http://localhost:5000/files", timeout=10)
        
        if response.status_code == 200:
            files = response.json()
            print(f"✅ Found {len(files)} files")
            for file in files:
                print(f"   📄 {file['name']} ({file['size']} bytes)")
        else:
            print(f"❌ HTTP Error: {response.status_code}")
            
    except Exception as e:
        print(f"❌ File listing test failed: {str(e)}")

if __name__ == "__main__":
    print("🚀 Advanced Web Scraper Platform - Test Suite")
    print("=" * 50)
    
    # Wait a moment for the app to start
    print("⏳ Waiting for application to start...")
    time.sleep(3)
    
    # Run tests
    test_scraper()
    test_file_listing()
    
    print("\n✨ Test suite completed!")
    print("🌐 Open http://localhost:5000 in your browser to use the web interface") 