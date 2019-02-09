const express = require('express')
const app = express()
const port = process.env.port || 3001
const cors = require('cors')
const mongoose = require('mongoose')


const server = require('http').Server(app)
const io = require('socket.io')(server)

mongoose.connect('mongodb://goweek:goweek123@ds225375.mlab.com:25375/goweek-fabiano-backend', {
    useNewUrlParser: true
})

app.use((req, res, next) => {
    req.io = io;
    return next()
})

app.use(cors())
app.use(express.json())
app.use(require('./routes'))

server.listen(port, () => console.log(`Server listening on port ${port}`))