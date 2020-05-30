const sqlite3 = require('sqlite3').verbose()
const db  = new sqlite3.Database('./ws.db')

db.serialize(function() {
  db.run(`
        CREATE TABLE  IF NOT EXISTS falcoes(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            title TEXT,
            description TEXT,
            logo TEXT
        );   
    `)
    
})

module.exports = db
