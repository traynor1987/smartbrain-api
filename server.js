const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const cors = require('cors');
const knex = require('knex')
const register = require('./controllers/register.js')
const signin = require('./controllers/signin')
const image = require('./controllers/image')
const clarifai = require('clarifai')

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : '',
      password : '',
      database : 'smart-brain'
    }
  });

const app = express();

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {res.send(database.users)})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt, saltRounds)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt, saltRounds)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)})

app.listen(3011, () => {
    console.log('server running...')
})