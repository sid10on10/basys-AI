const sqlite3 = require('sqlite3')

const db = new sqlite3.Database('stocks.db')



db.run(`CREATE TABLE IF NOT EXISTS trades (id INTEGER PRIMARY KEY AUTOINCREMENT, type VARCHAR(50), user_id INTEGER, symbol VARCHAR(50), shares INTEGER, price INTEGER, timestamp INTEGER)`)

