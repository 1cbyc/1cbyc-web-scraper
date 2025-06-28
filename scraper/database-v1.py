import sqlite3

# creating or connecting to the SQLite database
conn = sqlite3.connect('data/scraped_data.db')
cursor = conn.cursor()

# then creating a table
cursor.execute('''
CREATE TABLE IF NOT EXISTS data (
    id INTEGER PRIMARY KEY,
    link TEXT
)
''')

# then inserting collected data
def save_to_db(data):
    cursor.execute('INSERT INTO data (link) VALUES (?)', (data,))
    conn.commit()

# then closing the connection afterwards
def close_connection():
    conn.close()
