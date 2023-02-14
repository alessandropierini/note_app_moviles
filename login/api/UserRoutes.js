const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Note = require('../models/note')

var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]`~+/
var formatPassword = /[@%^&()\=\[\]{};':"\\|,<>\/?]`~+/


router.post('/register', (req, res) => {

    if (req.body.username.length < 5 || req.body.username.length > 12) {
        res.status(409).json({ error: 'Usuario debe tener entre 6 y 12 caracteres' })
    } else if (format.test(req.body.username)) {
        res.status(409).json({ error: 'Usuario no debe contener caracteres especiales' })
    } else if (req.body.password.length < 7 || req.body.password.length > 12) {
        res.status(409).json({ error: 'Contrasena debe tener entre 6 y 12 caracteres' })
    } else if (formatPassword.test(req.body.password)) {
        res.status(409).json({ error: 'Contrasena solo puede contener los siguientes caracteres especiales: ! $ # * _ - + .' })
    } else {
        const newUser = new User(req.body)
        console.log("Unencripted password: " + newUser.password)
        bcrypt.hash(newUser.password, 10, async function (error, hash) {
            newUser.password = hash
            console.log("encrypted password: " + newUser.password)
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
    }
})

router.post('/login', (req, res) => {

    User.findOne({ username: req.body.credentials.username }).then(user => {
        if (user) {
            bcrypt.compare(req.body.credentials.password, user.password, function (error, result) {
                if (result) {
                    res.status(200).json(user)
                } else {
                    res.status(401).json({ error: "Usuario o contrasena Incorrecta" })
                }
            })
        } else {
            res.status(401).json({ error: "Usuario no existe" })
        }
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

router.post('/eliminarUsuario', (req, res) => {
    console.log(req.body.username)
    User.findOneAndDelete({ username: req.body.username }).then(user => {
        if (user) {
            console.log("User: " + user.username)
            Note.deleteMany({ owner: user.username }).then(user => {
                res.status(200).json({ msg: "Usuario eliminado" })
            })
        } else {
            res.status(400).json({ msg: "No se encontro usuario" })
        }

    })
})

router.post('/updateInfo', (req, res) => {

    bcrypt.hash(req.body.info.newPassword, 10, async function (error, hash) {
        newHashedPassword = hash
        console.log("encrypted password: " + newHashedPassword)

        await User.updateOne(
            { username: req.body.info.username },
            {
                $set: {
                    bio: req.body.info.newBio,
                    password: this.newHashedPassword
                }
            }).then(user => {
                if (user) {
                    res.status(200).json(true)
                    console.log("user updated")
                } else {
                    res.status(401).json
                    console.log("user not found")
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