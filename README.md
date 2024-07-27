# 1cbyc Web Scraper

1cbyc Web Scraper is a Python-based tool designed to collect data from websites. It uses the `requests` and `BeautifulSoup` libraries to retrieve and parse web pages, and stores the extracted log in an SQLite db.

## Features

- Can scrape from multiple web pages
- Can handle pagination
- can store scraped data in an SQLite db (adding support for more soon)
- can mimic a web browser by setting custom headers
- **_adding more features soon_**

## For Installation

1. Clone my repository.

```bash
git clone https://github.com/1cbyc/1cbyc-web-scraper.git
cd 1cbyc-web-scraper
```

2. Clone my repository.

```bash
pip install -r requirements.txt
```

## Usage

1. Update the base_url and num_pages variables in main.py to match the target website and the number of pages you want to scrape.

```
base_url = 'http://nsisong.com/page/'  # you can replace with the actual base URL
num_pages = 5  # adjust the number of pages to scrape based on the target website
```
2. Run the scraper.

```
python main.py
```

3. Check the console output to see the progress and results of the scraping.


4. To view the scraped data, you can use the provided function in database.py to print all data:

```
from scraper.database import print_all_data
print_all_data()
```

## Alternatively,

open the scraped_data.db file using an SQLite browser to inspect the data.