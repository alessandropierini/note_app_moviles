const router = require('express').Router()
const Note = require('../models/note')
const User = require('../models/user')


router.post('/', (req, res) => {

    console.log(req.body.name)

    Note.find({ owner: req.body.name }).then(notes => {
        res.status(200).json(notes)
    }).catch(err => {
        res.status(500).json({ err })
    })
})

router.post('/createNewNote', async (req, res) => {
    if (req.body.title == null) {
        res.status(409).json({ error: 'Ingresa un titulo' })
        console.log('Empty title')
    } else if (req.body.description == null) {
        res.status(409).json({ error: 'Ingresa una descripcion' })
        console.log('Empty description')
    } else {
        const newNote = new Note(req.body)
        newNote.save().then(note => {
            res.status(201).json(note)
            console.log('note created')
        }).catch(err => {
            res.status(500).json({ error: err.message })
        })
    }
})

router.post('/showFavorites', (req, res) => {
    Note.find({ owner: req.body.name, favorite: true }).then(notes => {
        res.status(200).json(notes)
    }).catch(err => {
        res.status(500).json({ err })
    })
})

router.post('/favorite', (req, res) => {
    if (req.body.note.favorite == false) {
        Note.updateOne(
            { _id: req.body.note._id },
            {
                $set: {
                    favorite: true
                }
            }
        ).then(Note.find({ owner: req.body.note.owner }).then(notes => {
            res.status(200).json(notes)
        }).catch(err => {
            res.status(500).json({ err })
        }))
    } else {
        Note.updateOne(
            { _id: req.body.note._id },
            {
                $set: {
                    favorite: false
                }
            }
        ).then(Note.find({ owner: req.body.note.owner }).then(notes => {
            res.status(200).json(notes)
        }).catch(err => {
            res.status(500).json({ err })
        }))
    }
})





router.post('/updateNote', (req, res) => {

    Note.updateOne(
        { _id: req.body.updatedNote.id },
        {
            $set: {
                info: req.body.updatedNote.info,
                description: req.body.updatedNote.description
            }
        }).then(note => {
            if (note) {
                res.status(200).json(true)
                console.log("note updated")
            } else {
                res.status(401).json
                console.log("note not found")
            }
        })


})


router.post('/deleteNote', (req, res) => {
    Note.findOneAndDelete({ _id: req.body.deletedNote._id }).then(notes => {
        if (notes) {
            Note.find({ owner: req.body.deletedNote.owner }).then(notes => {
                res.status(200).json(notes)
            }).catch(err => {
                res.status(500).json({ err })
            })
        } else {
            res.status(400).json({ msg: "No se encontro usuario" })
        }
    })
})


const userNotes = async (username) => {
    const note = await User.findOne({ owner: username })
    if (note) {
        return true
    } else {
        return false
    }
}

module.exports = router