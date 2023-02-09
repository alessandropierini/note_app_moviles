require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const port = process.env.PORT || 3000

//Routes
const userRoutes = require('./api/UserRoutes')
const noteRoutes = require('./api/NoteRoutes')

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('hello')
})

app.use('/users', userRoutes)
app.use('/notes', noteRoutes)

mongoose.set('strictQuery', true)

mongoose.connect(process.env.MONGODB_URI,{useUnifiedTopology: true}).then(() => {
    app.listen(port, () => {
        console.log('App running on port: ' + port + '...')
    })
}).catch(err => console.log(err))