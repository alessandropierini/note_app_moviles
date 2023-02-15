const router = require('express').Router()
const Collection = require('../models/collection')
const Note = require('../models/note')




router.post('/createNewCollection', async (req, res) => {
    if (req.body.title == null) {
        res.status(409).json({ error: 'Ingresa un titulo' })
        console.log('Empty title')
    } else if (req.body.description == null) {
        res.status(409).json({ error: 'Ingresa una descripcion' })
        console.log('Empty description')
    } else if (await collectionExists(req.body.title)) {
        res.status(409).json({ error: 'Collection already exists' })
        console.log('Collection already exists')
    } else {
        const newCollection = new Collection(req.body)
        newCollection.save().then(collection => {
            res.status(201).json(collection)
            console.log('collection created')
        }).catch(err => {
            res.status(500).json({ error: err.message })
        })
    }
})

const collectionExists = async (title) => {
    const collection = await Collection.findOne({ title: title })
    if (collection) {
        return true
    } else {
        return false
    }
}

router.post('/', (req, res) => {

    console.log(req.body.name)

    Collection.find({ owner: req.body.name }).then(collection => {
        res.status(200).json(collection)
    }).catch(err => {
        res.status(500).json({ err })
    })
})


router.post('/deleteCollection', (req, res) => {

    variable = req.body.deletedCollection._id

    Collection.findOneAndDelete({ _id: req.body.deletedCollection._id }).then(collections => {
        if (collections) {
            Note.updateOne(
                { collections: variable },
                {
                    collections: undefined
                }
            )

            Collection.find({ owner: req.body.deletedCollection.owner }).then(collections => {
                res.status(200).json(collections)
            })
        }
    })
})



    router.post('/updateCollection', (req, res) => {
        Collection.updateOne(
            { _id: req.body.updatedCollection.id },
            {
                $set: {
                    description: req.body.updatedCollection.description,
                    title: req.body.updatedCollection.title
                }
            }).then(collection => {
                if (collection) {
                    res.status(200).json(true)
                    console.log("Collection updated")
                } else {
                    res.status(401).json
                    console.log("Collection not found")
                }
            })
    })

    module.exports = router