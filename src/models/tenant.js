const mongoose = require('mongoose')
const validator = require('validator')

// Tenant model
const tenantSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
        trim: true
    },
    last_name: {
        type: String,
        required: true,
        trim: true
    },
    birthday: {
        type: String,
        required: true,
        trim: true
    },
    mobile: {
        type: String,
        min: 11,
        max: 11,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Please provide a valid email address')
            }
        }
    },
    profile: {
        data: Buffer,
        contentType: String
    },
    room: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Room'
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Property'
    },
}, {
    timestamps: true
})


const Tenant = mongoose.model('Tenant', tenantSchema)

module.exports = Tenant