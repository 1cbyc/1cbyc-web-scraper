import sqlite3
# decided to update the database code to do something new like saving each site in an individual file and with time stamp, so i will import os and also from datetime import datetime
import os
from datetime import datetime

def get_db_path(base_url):
    # this will create a directory for storing the databases if it doesn't exist
    if not os.path.exists('data'):
        os.makedirs('data')

    # will use base_url to create a unique filename with timestamp
    base_name = base_url.replace('http://', '').replace('https://', '').replace('/', '_')
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    db_filename = f"data/{base_name}_{timestamp}.db"

    return db_filename

def create_connection(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # after creating connection time to create table
    cursor.execute('''
    CREATE TABLE IF NOT EXISTS data (
        id INTEGER PRIMARY KEY,
        link TEXT
    )
    ''')

    return conn, cursor

# time to insert the data derived
def save_to_db(cursor, data):
    cursor.execute('INSERT INTO data (link) VALUES (?)', (data,))
    cursor.connection.commit()

# adding the function to close the connection
def close_connection(conn):
    conn.close()

# time to add function to print all data in the tabe for verification
def print_all_data(cursor):
    cursor.execute('SELECT * FROM data')
    rows = cursor.fetchall()
    for rows in rows:
        print(row)

# having updated the database instruction now to support allocated files let me push

# # creating or connecting to the SQLite database
# conn = sqlite3.connect('data/scraped_data.db')
# cursor = conn.cursor()
#
# # then creating a table
# cursor.execute('''
# CREATE TABLE IF NOT EXISTS data (
#     id INTEGER PRIMARY KEY,
#     link TEXT
# )
# ''')
#
# # then inserting collected data
# def save_to_db(data):
#     cursor.execute('INSERT INTO data (link) VALUES (?)', (data,))
#     conn.commit()
#
# # then closing the connection afterwards
# def close_connection():
#     conn.close()
