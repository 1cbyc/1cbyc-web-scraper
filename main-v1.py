from scraper.scraper import scrape_multiple_pages
from scraper.database import close_connection


def main():
    base_url = 'https://landwey.ng/get-started/'  # will modify later to take data from a list of url
    num_pages = 5  # can adjust the number of pages to scrape
    scrape_multiple_pages(base_url, num_pages)

    # then close the database connection after scraping
    close_connection()


if __name__ == "__main__":
    main()
