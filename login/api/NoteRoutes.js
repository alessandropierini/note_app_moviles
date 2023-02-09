const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')


router.post('/', (req, res) => {

//problema aqui, no logro encontrar user
    console.log(req.body.name)

    Note.find({owner: req.body.name}).then(notes => {
        res.status(200).json(notes)
    }).catch(err => {
        res.status(500).json({err})
    })
})

router.post('/createNewNote', async (req, res) => {
    if (req.body.title == null) {
        res.status(409).json({ error: 'Ingresa un titulo' })
        console.log('Empty title')
    } else if (req.body.description == null){
        res.status(409).json({error: 'Ingresa una descripcion'})
        console.log('Empty description')
    } else {
        const newNote = new Note(req.body)
        newNote.save().then(note => {
            res.status(201).json(note)
            console.log('note created')
        }).catch(err => {
            res.status(500) .json({ error: err.message })
        })
    }
})

const userNotes = async (username) => {
    const note = await User.findOne({ owner: username})
        if (note) {
            return true
        } else {
            return false
        }
}

module.exports = router