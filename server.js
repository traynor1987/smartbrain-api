const express = require('express')
const bodyParser = require('body-parser')

const app = express();

app.use(bodyParser.json())

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@mail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@mail.com',
            password: 'beth',
            entries: 0,
            joined: new Date()
        }
    ]
}

app.get('/', (req, res) => {
    res.send(database.users)
})

app.post('/signin', (req, res) => {
    if (req.body.email === database.users[0].email && req.body.password === database.users[0].password) {
        res.json("Working")
    } else {
        res.status(400).json("Error logging in")
    }
})

app.get('/profile/:id', (req, res) => {
    const { id } = req.params
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            return res.json(user)
        } 
    })
    if (!found) {
        res.status(404).json("No such User")
    }

})

app.post('/register', (req, res) => {
    const { email, password, name } = req.body
    database.users.push({
        id: '125',
        name: name,
        email: email,
        password: password,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length-1])
})

app.post('/image', (req, res) => {
    const { id } = req.body
    let found = false
    database.users.forEach(user => {
        if (user.id === id) {
            found = true
            user.entries++
            return res.json(user.entries)
        } 
    })
    if (!found) {
        res.status(404).json("No such User")
    }
})

app.listen(3010, () => {
    console.log('server running...')
})