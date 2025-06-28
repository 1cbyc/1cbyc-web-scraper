# 1cbyc Web Scraper

1cbyc Web Scraper is a Python-based tool designed to collect data from websites. It uses the `requests` and `BeautifulSoup` libraries to retrieve and parse web pages, and stores the extracted log in an SQLite db.

## Features I remember

- can scrape from multiple web pages
- can handle pagination
- can store scraped data in an SQLite db (adding support for more soon)
- can mimic a web browser by setting custom headers
- (not to be a brag but) i added a way to classify the scraped data as individual texts
- (since i have lazy pals) i added a way to read the sqlite file without stressing about sqlite on your machine
- **_adding more features soon_**

## For Installation

1. just clone my repository.

```bash
git clone https://github.com/1cbyc/1cbyc-web-scraper.git
cd 1cbyc-web-scraper
```

2. then download the required packages.

```bash
pip install -r requirements.txt
```

## This is how to use it

1. simply update the base_url and num_pages variables in main.py to match the target website and the number of pages you want to scrape.

```
base_url = 'http://nsisong.com/page/'  # you can replace with the actual base URL
num_pages = 5  # adjust the number of pages to scrape based on the target website
```
2. then, run the scraper.

```
python main.py
```

3. make sure to check the console output to see the progress and results of the scraping.


4. also, to view the scraped data, you can use the provided function in database.py to print all data:

```
from scraper.database import print_all_data
print_all_data()
```

### i gave a shorter way to read the data by adding a read_db.py file to this project but i think i should not be an advocate for shortcuts. so, just do this:

## get a db browser for SQLite atleast

like just download and install the db browser for SQLite:

1. go to the [DB Browser for SQLite website](https://sqlitebrowser.org/).
2. then, download and install the version suitable for your pc.

### so, open the SQLite db File:

1. open the DB browser.
2. click "Open Database" and go to the `data` dir.
3. then, select the desired `.db` file you wanna check and click "open".

### go through the data:

1. you can use the "browse data" tab to view the contents of the `data` table.
2. you can also run SQL queries using the "execute SQL" tab.

### I pushed it live 

1. since i have pushed the project for general use. you can now visit it by [webscraper.nsisong.com](https://webscraper.nsisong.com) to get started.
however, to do that, since i did not push the "data" folder in my local machine to github, i did this in the command:
`mkdir -p data && python app.py` also, i wrote a deployment shell file you should check for `deploy.sh` in this repo.
2. I am **warning** you guys to use SQLite DB browser to read the file, else, you're on your own.


#### All in all, you now know you can open the scraped_data.db file using an SQLite browser to inspect the data and not use my shitty method.


## As for Contributing

to be honest, i want you guys to fork this repository, make improvements, and submit pull requests. probably we'd get a v2.1 release faster. suggest new features too, and i promise to work on it (if it makes sense).


# PLEASE USE IT FOR EDUCATIONAL PURPOSES O!