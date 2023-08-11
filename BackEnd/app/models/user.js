const mongoose = require('mongoose')
const emailFormat = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
const Schema = mongoose.Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return emailFormat.test(value)
            },
            message: function () {
                return 'Invalid email format'
            }
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "Customer"
    }
})

const User = mongoose.model('User', UserSchema)
module.exports = User