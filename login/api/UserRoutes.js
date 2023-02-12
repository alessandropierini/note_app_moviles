const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')


router.post('/register', async (req, res) => {

    const newUser = new User(req.body)
    console.log("Unencripted password: " + newUser.password)
    bcrypt.hash(newUser.password, 10, function (error, hash) {
        newUser.password = hash
        console.log("encrypted password: " + newUser.password)
    })

    if (await userExists(req.body.username)) {
        res.status(409).json({ error: 'Username already exists' })
        console.log('User already exists')
    } else {
        newUser.save().then(user => {
            res.status(201).json(user)
        }).catch(error => {
            res.status(500).json({ error: error.message })
        })
    }
})

router.post('/login', (req, res) => {

    User.findOne({ username: req.body.username }).then(user => {

        bcrypt.compare(req.body.password, user.password, function (error, result) {

            if (result) {
                res.status(200).json(user)
            } else {
                console.log(error)
                res.status(401).json({ error: "Usuario o contrasena Incorrecta" })
            }
        })
    })
})

router.get('/registeredUsers', (req, res) => {
    User.find({ userExists: true }).then(user => {
        if (user) {
            console.log("test")
            res.status(200).json(user)
        } else {
            console.log(err)
            console.log("test2")
            res.status(401).json({ error: "No hay usuarios" })
        }
    })
})

//quedaste aqui

router.post('/updateInfo', (req, res) => {
    console.log(req.body.user)
    User.findOne({ username: req.body.user }).then(user => {

        mongoose.updateOne(
            { username: req.body.user },
            {
                $set:
                {
                    password: newPassword,
                    bio: newBio
                }
            }
        )
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