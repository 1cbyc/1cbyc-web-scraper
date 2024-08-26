import sqlite3
from datetime import datetime
# what i am doing here is to manage the db ops

def save_to_db(base_url, data):
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    db_name = f"data/{base_url.replace('://', '_').replace('/', '_')}_{timestamp}.db"
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    cursor.execute('''
        CREATE TABLE IF NOT EXISTS scraped_data (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            link TEXT NOT NULL
        )
    ''')

    for item in data:
        cursor.execute('''
            INSERT INTO scraped_data (link)
            VALUES (?)
        ''', (item,))

    conn.commit()
    conn.close()
    return db_name


def fetch_all_data(db_name):
    conn = sqlite3.connect(db_name)
    cursor = conn.cursor()

    cursor.execute('SELECT link FROM scraped_data')
    rows = cursor.fetchall()

    conn.close()
    return rows
