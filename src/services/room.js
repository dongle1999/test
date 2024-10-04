const randomstring = require('randomstring')
const Room = require('../models/room')

// Create room
const roomNew = async (roomObject) => {
    let i = 0

    for (i = 0; i < roomObject.number; i++) {
        const room = new Room({
            catalog: roomObject.catalog,
            name: randomstring.generate({ length: 5, charset: 'alphanumeric' }),
            floor: roomObject.floor,
            tenant: null,
            property: roomObject.property
        })

        await room.save()
    }
}

// List rooms
const roomList = async (propertyId) => {
    const rooms = await Room.find({ property: propertyId })
        .lean()
        .populate('catalog')
        .populate('tenant')
        .exec()

    return { rooms }
}

// Update room info
const roomUpdate = async (roomObject) => {
    const room = await Room.findByIdAndUpdate(roomObject._id, {
        name: roomObject.name,
        floor: roomObject.floor,
        catalog: roomObject.catalog
    }, { new: true })

    return { room }
}

// Delete room
const roomDelete = async (roomObject) => {
    const room = await Room.findById(roomObject._id)

    if (room.tenant) {
        throw new Error('Error: Room deletion failed.')
    }

    await Room.findOneAndDelete({ _id: roomObject._id, property: roomObject.property })
}


module.exports = {
    roomNew,
    roomList,
    roomUpdate,
    roomDelete
}