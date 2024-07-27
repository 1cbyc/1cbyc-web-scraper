import requests
from bs4 import BeautifulSoup
from .database import save_to_db


def scrape_page(url):
    response = requests.get(url)

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        for link in soup.find_all('a'):
            href = link.get('href')
            if href:
                save_to_db(href)
    else:
        print(f"Failed to retrieve the page. Status code: {response.status_code}")


def scrape_multiple_pages(base_url, num_pages):
    for page in range(1, num_pages + 1):
        url = f"{base_url}{page}"
        scrape_page(url)
