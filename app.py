import os
from flask import Flask, request, render_template, jsonify, send_file
from scraper.scraper import scrape_multiple_pages
from scraper.db_utils import save_to_db

app = Flask(__name__)

def ensure_scheme(url):
    if not url.startswith(('http://', 'https://')):
        return 'http://' + url
    return url

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()
        if data:
            base_url = data.get('base_url')
            num_pages = int(data.get('num_pages'))
        else:
            base_url = request.form['base_url']
            num_pages = int(request.form['num_pages'])

        if not base_url or num_pages <= 0:
            # return "this entry no valid o, try am again."
            return jsonify({"error": "this entry no valid"}), 400

        base_url = ensure_scheme(base_url)

        # Start scraping
        scraped_data = scrape_multiple_pages(base_url, num_pages)
        # data = scrape_multiple_pages(base_url, num_pages)
        db_name = save_to_db(base_url, data)

        # Return db_name as JSON response
        return jsonify({'db_name': db_name})

    return render_template('index.html')

@app.route('/download/<path:db_name>')
def download(db_name):
    file_path = os.path.join('data', db_name)
    print(f"ah dey find the scraped data: {file_path}") # want to use this to debug output atleast
    # ah use this find out if the file_path is correct
    if os.path.exists(file_path):
        return send_file(file_path, as_attachment=True)
    else:
        return "Ah no see the file o"

@app.route('/list_files')
def list_files():
    files = os.listdir('data')
    return jsonify(files)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
