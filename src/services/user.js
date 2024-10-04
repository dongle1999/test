const fs = require('fs')
const jwt = require('jsonwebtoken')
const sharp = require('sharp')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

// Username check
const usernameCheck = async (userObject) => {
    const user = await User.findOne({ username: userObject.username })

    if (user) {
        throw new Error('Username is already taken.')
    }

    return true
}

// Email check
const emailCheck = async (userObject) => {
    const user = await User.findOne({ email: userObject.email })

    if (user) {
        throw new Error('Username is already taken.')
    }

    return true
}

// Sign up
const userSignup = async (userObject) => {
    const user = new User(userObject)

    await user.save()
}

// Log in
const userLogin = async (userObject) => {
    const user = await User.findByCredentials(userObject.email, userObject.password)
    const token = await user.generateAuthToken()

    return { user, token }
}

// Update user avatar
const userAvatarUpdate = async (userId, fileObject) => {
    const img = fs.readFileSync(fileObject[0].path)
    const encoded_image = await sharp(img).resize({ width: 250, height: 250 }).png().toBuffer()
    const type = fileObject[0].mimetype

    const userUpdated = await User.findByIdAndUpdate(userId, {
        avatar: {
            data: encoded_image,
            contentType: type
        }
    }, { new: true })

    return { userUpdated }
}

// Update user info
const userUpdate = async (userId, userObject) => {
    const userUpdated = await User.findByIdAndUpdate(userId, {
        username: userObject.username,
        first_name: userObject.first_name,
        last_name: userObject.last_name,
        mobile: userObject.mobile,
        email: userObject.email
    }, { new: true })

    return { userUpdated }
}

// Update password
const userPasswordChange = async (userId, userObject) => {
    const user = await User.findByCredentials(userObject.email, userObject.currentPassword)

    if (!user) {
        throw new Error()
    }

    const newPassword = await bcrypt.hash(userObject.newPassword, 8)
    const userUpdated = await User.findByIdAndUpdate(userId, {
        password: newPassword
    }, { new: true })

    return { userUpdated }
}

// Log out
const userLogout = async (token) => {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })

    user.tokens = user.tokens.filter((tokenFiltered) => {
        return tokenFiltered.token !== token
    })

    await user.save()
}

module.exports = {
    usernameCheck,
    emailCheck,
    userSignup,
    userLogin,
    userAvatarUpdate,
    userUpdate,
    userPasswordChange,
    userLogout
}