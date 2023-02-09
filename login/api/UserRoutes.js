const router = require('express').Router()
const User = require('../models/user')

router.post('/register', async (req, res) => {
    if (await userExists(req.body.username)) {
        res.status(409).json({ error: 'Username already exists' })
        console.log('User already exists')
    } else {
        const newUser = new User(req.body)
        newUser.save().then(user => {
            res.status(201).json(user)
            console.log('User created')
        }).catch(err => {
            res.status(500).json({ error: err.message })
        })
    }
})

router.post('/login', (req, res) => {
    User.findOne({username:req.body.username, password:req.body.password}).then(user => {
        if(user){
            res.status(200).json(user)
        } else {
            res.status(401).json({error: "Usuario o contrasena Incorrecta"})
        }
    }).catch(err => {
        res.status(500).json({error: err.message})
    })
})

const userExists = async (username) => {
    const user = await User.findOne({ username: username})
        if (user) {
            return true
        } else {
            return false
        }
}



module.exports = router