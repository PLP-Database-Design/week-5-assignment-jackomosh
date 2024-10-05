const express = require('express')
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv')
const cors = require('cors')

app.use(express.json())
dotenv.config()
app.use(cors())



// Connecting to database

const db = mysql.createConnection(
    {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
)


// Get endpoint method to retrieve all patients

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.get('/patients', (req,res) => {
    db.query('SELECT * FROM patients', (err, results) => {
        if (err){
            console.error(err)
            res.status(500).send('Error retrieving data')
        }
        else{
            res.render('patients', {results: results})
        }
    })
})

// Send a message

console.log('Sending message to browser...')
app.get('/', (req,res) => {
    res.send('Successfull StartUp!!!!')
})



// Get endpoint method to retrieve all providers

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.get('/providers', (req,res) => {
    db.query('SELECT * FROM providers', (err, results) => {
        if (err){
            console.error(err)
            res.status(500).send('Error retrieving data')
        }
        else{
            res.render('providers', {results: results})
        }
    })
})


// GET endpoint that retrieves all patients by their first name

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.get('/firstname', (req,res) => {
    db.query('SELECT * FROM patients', (err, results) => {
        if (err){
            console.error(err)
            res.status(500).send('Error retrieving data')
        }
        else{
            res.render('firstname', {results: results})
        }
    })
})


// GET endpoint that retrieves all providers by their specialty

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.get('/specialty', (req,res) => {
    db.query('SELECT * FROM providers', (err, results) => {
        if (err){
            console.error(err)
            res.status(500).send('Error retrieving data')
        }
        else{
            res.render('specialty', {results: results})
        }
    })
})



// listen to the server

const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})