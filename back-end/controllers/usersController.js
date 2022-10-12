const User = require('../models/User')
const Note = require('../models/Note')

//Permet d'utiliser try catch avec async et wait avec mongoose
const asyncHandler = require('express-async-handler')

//Permet de hasher le mot de passe aant de sauvegarder dans la base de donnees
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {

    //renvoies les information sans mot de passe
    const users = await User.find().select('-password').lean()
    if(!users){
        return res.status(400).json({ message: 'No users found'})
    }
    res.json(users)
})

// @desc Create new users
// @route POST /users
// @access Private
const cerateNewUsers = asyncHandler(async (req, res) => {
    const {username, password, roles} = req.body

    //Confirmation des donnees
    if(!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(404).json({ message: 'All fields are required'})
    }

    //Verifier s'il y'a les doublons(duplication)
    const duplicate = await User.findOne({ username }).lean().exec()

    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate username found'})
    }

    //Hash password
    const hashedPwd = await bcrypt.hash(password, 10)

    const userObject = {username, "password": hashedPwd, roles}

    //Create and store new user
    const user = await User.create(userObject)

    if(user) {
        res.status(201).json({ message: `New user ${username} created`})
    } else {
        res.status(400).json({ message: `Invalid user data received`})
    }
})

// @desc Update a users
// @route PATCH /users
// @access Private
const updateUsers = asyncHandler(async (req, res) => {
    const { id, username, roles, active, password } = req.body

    //Confirm data
    if(!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({ message : 'All fields are required'})
    }

    const user = await User.findById(id).exec()

    if(!user) {
        return res.status(400).json({ message : 'User not found'})
    }

    //Check for duplicate
    const duplicate =  await User.findOne({ username}).lean().exec()

    //Allow updates to the original user
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate username'})
    }

    user.username = username
    user.roles = roles
    user.active = active

    if(password) {
        //Hash password 
        user.password = await bcrypt.hash(password, 10) // salt arounds

        const updatedUser = await user.save()

        res.json({ message: `${updatedUser.username} updated` })
    }
})

// @desc Delete a users
// @route DELETE /users
// @access Private
const deleteUsers = asyncHandler(async (req, res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({ message: 'User ID Required'})
    }

    const notes = await Note.findOne({ user: id}).lean().exec()
    if(notes?.length) {
        return res.status(400).json({ message: 'User has assigned notes'})
    }

    const user = await User.findById(id).exec()

    if(!user) {
        return res.status(400).json({ message: 'User not found'})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllUsers,
    cerateNewUsers,
    updateUsers,
    deleteUsers
}