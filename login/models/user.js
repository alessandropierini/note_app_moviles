const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

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
    }
})

//doesnt encrypt password

UserSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  
  UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };


module.exports = mongoose.model('User', UserSchema)