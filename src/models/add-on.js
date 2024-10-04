const mongoose = require('mongoose')

// Add-on model
const addOnSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    rate: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: true,
        trim: true
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Property'
    },
}, {
    timestamps: true
})

const AddOn = mongoose.model('AddOn', addOnSchema)

module.exports = AddOn