// Room model
const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    catalog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Catalog'
    },
    name: {
        type: String,
        unique: true,
        trim: true,
        uppercase: true
    },
    floor: {
        type: String,
        trim: true
    },
    tenant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tenant'
    },
    property: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Property'
    }
}, {
    timestamps: true
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room 