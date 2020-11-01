const express = require('express')
const nunjucks = require('nunjucks')
const app = express()

const db = require('./database/db')

app.set('view engine', 'njk')

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

nunjucks.configure('src/views', {
    express: app,
    autoescape: false,
    noCache: true
})

app.get('/', (req ,res) => {
    return res.render('index')
})

app.get('/create-point', (req ,res) => {
    return res.render('create-point')
})

app.post('/create-point', (req ,res) => {
    const { name, image, address, address2, state, city, items } = req.body
    const query = 'INSERT INTO places (name, image, address, address2, state, city, items) VALUES (?, ?, ?, ?, ?, ?, ?);'
    const values = [name, image, address, address2, state, city, items]

    db.run(query, values, function(err) {
        if(err){
            console.log(err)
            return res.send('Erro no cadastro')
        }
        
        return res.render('create-point', { saved: true })
    })
})

app.get('/search', (req ,res) => {
    const { search } = req.query

    if(!search) {
        db.all(`SELECT * FROM places`, function(err, rows) {
            if(err)
                return console.log(err)

            const total = rows.length
            return res.render('search-results', { places: rows, total } )
        })
    } else {
        db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
            if(err)
                return console.log(err)

            const total = rows.length
            return res.render('search-results', { places: rows, total } )
        })
    }

})

app.listen(3333)