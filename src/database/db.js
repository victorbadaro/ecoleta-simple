const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('./src/database/database.db')

module.exports = db

db.serialize(() => {
  db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            image TEXT,
            address TEXT,
            address2 TEXT,
            state TEXT,
            city TEXT,
            items TEXT
        );
    `)

  const query = 'INSERT INTO places (name, image, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);'
  const values = [
    'Papersider',
    'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80',
    'Guilherme Gemballa, Jardim America',
    'N° 260',
    'Santa Catarina',
    'Rio do Sul',
    'Papéis e Papelão'
  ]

  function afterInsertData(err) {
    if (err)
      return console.log(err)

    console.log('Cadastrado com sucesso!')
    console.log(this)
  }

  db.run(query, values, afterInsertData)

  db.all(`SELECT * FROM places`, function (err, rows) {
    if (err)
      return console.log(err)

    console.log('Aqui estão seus registros:')
    console.log(rows)
  })

  db.run(`DELETE FROM places WHERE id = ?`, [1], function (err) {
    if (err)
      return console.log(err)

    return console.log('Registro deletado com sucesso!')
  })
})