# since i am a lazy mother fucker i decided to add a way to read the sqlite file since i know i have lazy friends too
import sqlite3
import os


def read_db(db_path):
    if not os.path.exists(db_path):
        print(f"egbon this db file {db_path} does not exist.")
        return

    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    cursor.execute('SELECT * FROM data')
    rows = cursor.fetchall()

    print(f"Data in {db_path}:")
    for row in rows:
        print(row)

    conn.close()


def main():
    db_files = [f for f in os.listdir('data') if f.endswith('.db')]
    for db_file in db_files:
        db_path = os.path.join('data', db_file)
        read_db(db_path)


if __name__ == "__main__":
    main()
