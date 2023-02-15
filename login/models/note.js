const mongoose = require('mongoose')

const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Por favor, ingresa un titulo']
    },
    description: {
        type: String,
        required: [true, 'Por favor, ingresa una descripcion']
    },
    info: {
        type: String,
        required: [false, 'Por favor, ingresa una descripcion']
    },
    owner: {
        type: String,
        required:  [true, 'No tiene dueno']
    },
    favorite: {
        type: Boolean,
        required: [false]
    },
    collections: {
        type: String,
        required: [false]
    }

    // collection and favorite
})

module.exports = mongoose.model('Note', NoteSchema)