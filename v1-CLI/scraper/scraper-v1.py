import requests
from bs4 import BeautifulSoup
from .database import save_to_db


def scrape_page(url):
    # i want to mimic a browser cause of the 403 error, so i will add a headers
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
    # response = requests.get(url)
    # instead of just running request directly with the url like i did above, i will add the headers like this:
    response = requests.get(url, headers=headers)


    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        for link in soup.find_all('a'):
            href = link.get('href')
            if href:
                save_to_db(href)
                #i think i should add a way to let me know it did successfully with a print statement
                print(f"chairmo e don save o: {href}")
    else:
        print(f"hey chief i could not retrieve the page o. Status code: {response.status_code}")


def scrape_multiple_pages(base_url, num_pages):
    for page in range(1, num_pages + 1):
        url = f"{base_url}{page}"
        scrape_page(url)
