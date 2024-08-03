import requests
from bs4 import BeautifulSoup
import os
import sqlite3
from datetime import datetime
# from .database import save_to_db
# decided to update the scraper script this time to perform the multiple tasks of showing time stamp and as well saving each site as a db file by adding a whole new "from .database import get_db_path, create_connection, save_to_db, close_connection"
# from .database import get_db_path, create_connection, save_to_db, close_connection

# now i have to add the "cursor"  to the url in the scrape page function instead of just "url"
def scrape_page(url, cursor):
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
                save_to_db(cursor, href) # i added cursor before href here instead of just href since i called it earlier
                #i think i should add a way to let me know it did successfully with a print statement
                print(f"chairmo e don save o: {href}")
    # as chairman wey ah be, i decided to use elif since i now have multiple tasks
    elif response.status_code == 404:
        print(f"hey chief i could not retrieve the page o. Status code: {response.status_code}")
    else:
        print(f"hey chief i could not retrieve the page o. Status code: {response.status_code}. URL: {url}") # now i added the specific URL for error rendering, so if one url had issue, i will know


# now i need to explain to the code that it is just not one task so it will be like this
def scrape_multiple_pages(base_url, num_pages):
    db_path = get_db_path(base_url)
    conn, cursor = create_connection(db_path)

    for page in range(1, num_pages + 1):
        url = f"{base_url}{page}"
        print(f"scraping this site: {url}") # this will log the url that is being scraped
        scrape_page(url, cursor)
# def scrape_multiple_pages(base_url, num_pages):
#     for page in range(1, num_pages + 1):
#         url = f"{base_url}{page}"
#         scrape_page(url)

# after that is done, i will close connection then
    close_connection(conn)