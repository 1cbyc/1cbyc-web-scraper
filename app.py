from flask import Flask, request, render_template, redirect, url_for
from scraper.scraper import scrape_multiple_pages
import os

app = Flask(__name__)


@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        base_url = request.form['base_url']
        num_pages = int(request.form['num_pages'])

        if not base_url or num_pages <= 0:
            return "this entry no valid o, try am again."

        # Start scraping
        scrape_multiple_pages(base_url, num_pages)
        return redirect(url_for('index'))

    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
