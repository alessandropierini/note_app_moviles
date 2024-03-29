const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Por favor, ingresa un usuario']
    },
    password: {
        type: String,
        required: [true, 'Por favor, ingresar una contrasena']
    },
    userExists: {
        type: Boolean,
        required: [true]
    },
    bio: {
        type: String,
        required: [true, 'Por favor, ingrese un bio']
    }
})



module.exports = mongoose.model('User', UserSchema)