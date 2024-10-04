const Property = require('../models/property')
const Booking = require('../models/booking')

// Create booking
const bookingNew = async (bookingObject, bookingId) => {

    const property = await Property.findOne({ bookingId: bookingId })

    if (!property) {
        throw new Error('Property doesn\'t exist.')
    }

    const booking = new Booking({
        first_name: bookingObject.first_name,
        last_name: bookingObject.last_name,
        birthday: bookingObject.birthday,
        mobile: bookingObject.mobile,
        email: bookingObject.email,
        catalog: bookingObject.catalog,
        property: property._id
    })

    await booking.save()
}

// List bookings
const bookingList = async (propertyId) => {
    const bookings = await Booking.find({ property: propertyId })
        .lean()
        .populate('catalog')
        .exec()

    return { bookings }
}

// Decline booking
const bookingDecline = async (bookingObject) => {
    await Booking.findOneAndDelete({ _id: bookingObject._id })
}

module.exports = {
    bookingNew,
    bookingList,
    bookingDecline
}