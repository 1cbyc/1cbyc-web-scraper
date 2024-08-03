import os
from flask import Flask, request, render_template, redirect, url_for, send_file
from scraper.scraper import scrape_multiple_pages
from scraper.db_utils import save_to_db, fetch_all_data


app = Flask(__name__)

# since it seem like people might not use https:// or http:// then i added this:
def ensure_scheme(url):
    if not url.startswith(('http://', 'https://')):
        return 'http://' + url
    return url
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        base_url = request.form['base_url']
        num_pages = int(request.form['num_pages'])

        if not base_url or num_pages <= 0:
            return "this entry no valid o, try am again."

        # # Start scraping
        # scrape_multiple_pages(base_url, num_pages)
        # return redirect(url_for('index'))
        data = scrape_multiple_pages(base_url, num_pages)
        db_name = save_to_db(base_url, data)

        return render_template('index.html', db_name=db_name)

    return render_template('index.html')

@app.route('/download/<db_name>')
def download(db_name):
    file_path = os.path.join('data', db_name)
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    else:
        return "Ah no see the file o."


if __name__ == '__main__':
    # app.run(debug=True)
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
