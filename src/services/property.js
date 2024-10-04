const { v4: uuidv4 } = require('uuid')
const Property = require('../models/property')
const Room = require('../models/room')

// Create property
const propertyNew = async (propertyObject, userId) => {
    const property = new Property({
        ...propertyObject,
        bookingId: uuidv4(),
        owner: userId
    })

    await property.save()
}

// List all properties
const propertyListAll = async () => {
    const properties = await Property.find({})
        .lean()

    return { properties }
}

// List all properties of specific user
const propertyList = async (userId) => {
    const properties = await Property.find({ owner: userId })
        .lean()

    return { properties }
}

// View property
const propertyView = async (bookingId) => {
    const property = await Property.findOne({ bookingId: bookingId })
        .lean()

    return { property }
}

// Get property
const propertyGet = async (propertyId) => {
    const property = await Property.findOne({ _id: propertyId })
        .lean()

    return { property }
}

// Update property info
const propertyEdit = async (propertyObject) => {
    const property = await Property.findByIdAndUpdate(propertyObject._id, {
        name: propertyObject.name,
        location: propertyObject.location
    })

    return { property }
}

// Delete property info
const propertyDelete = async (propertyObject, userId) => {
    const rooms = await Room.find({ property: propertyObject._id })

    if (rooms.length > 0) {
        throw new Error('Error: Property deletion failed.')
    }

    await Property.findOneAndDelete({ _id: propertyObject._id, owner: userId })
}

module.exports = {
    propertyNew,
    propertyListAll,
    propertyList,
    propertyView,
    propertyGet,
    propertyEdit,
    propertyDelete
} 