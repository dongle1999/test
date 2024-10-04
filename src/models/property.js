// Property model
const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    location: {
        type: String,
        required: true,
    },
    bookingId: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

propertySchema.virtual('catalogs', {
    ref: 'Catalog',
    localField: '_id',
    foreignField: 'property'
})

propertySchema.virtual('addOns', {
    ref: 'AddOn',
    localField: '_id',
    foreignField: 'property'
})

propertySchema.virtual('rooms', {
    ref: 'Room',
    localField: '_id',
    foreignField: 'owner'
})

propertySchema.virtual('tenants', {
    ref: 'Tenant',
    localField: '_id',
    foreignField: 'property'
})

const Property = mongoose.model('Property', propertySchema)

module.exports = Property 