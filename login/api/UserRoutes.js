const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')


router.post('/register', async (req, res) => {

    const newUser = new User(req.body)
    console.log("Unencripted password: " + newUser.password)
    bcrypt.hash(newUser.password, 10, function (err, hash) {
        newUser.password = hash
        console.log("encrypted password: " + newUser.password)
    })

    if (await userExists(req.body.username)) {
        res.status(409).json({ error: 'Username already exists' })
        console.log('User already exists')
    } else {
        newUser.save().then(user => {
            res.status(201).json(user)
        }).catch(err => {
            res.status(500).json({ error: err.message })
        })
    }
})

router.post('/login', (req, res) => {

    User.findOne({ username: req.body.username }).then(user => {

        bcrypt.compare(req.body.password, user.password, function (error, result) {

            if (result) {
                res.status(200).json(user)
            } else {
                console.log(result)
                res.status(401).json({ error: "Usuario o contrasena Incorrecta" })
            }
        })
    })
})


const userExists = async (username) => {
    const user = await User.findOne({ username: username })
    if (user) {
        return true
    } else {
        return false
    }
}


module.exports = router