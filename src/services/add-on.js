const AddOn = require('../models/add-on')

// Create add-on
const addOnNew = async (addOnObject) => {
    const addOn = new AddOn(addOnObject)

    await addOn.save()
}

// List add-ons
const addOnList = async (propertyId) => {
    const addOns = await AddOn.find({ property: propertyId })
        .lean()

    return { addOns }
}

// Update add-on
const addOnUpdate = async (addOnObject) => {
    const addOn = await AddOn.findByIdAndUpdate(addOnObject._id, {
        name: addOnObject.name,
        rate: addOnObject.rate,
        type: addOnObject.type,
    }, { new: true })

    return { addOn }
}

// Delete add-on
const addOnDelete = async (addOnObject) => {
    await AddOn.findOneAndDelete({ _id: addOnObject._id })
}

module.exports = {
    addOnNew,
    addOnList,
    addOnUpdate,
    addOnDelete
}