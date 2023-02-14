const mongoose = require('mongoose')

const CollectionSchema = new mongoose.Schema({
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
    }
})

module.exports = mongoose.model('Collection', CollectionSchema)