const Note = require('../models/Note')
const User = require('../models/User')

//Permet d'utiliser try catch avec async et wait avec mongoose
const asyncHandler = require('express-async-handler')

//Permet de hasher le mot de passe aant de sauvegarder dans la base de donnees
const bcrypt = require('bcrypt')

// @desc Get all notes
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {

    //renvoies les information sans mot de passe
    const notes = await Note.find().lean()

    if(!notes?.length){
        return res.status(400).json({ message: 'No notes found'})
    }

    // Add username to each note before sending the response 
    // See Promise.all with map() here: https://youtu.be/4lqJBBEpjRE 
    // You could also do this with a for...of loop
    const notesWithUser = await Promise.all(notes.map(async(note) =>{
        const user = await User.findById(note.user).lean().exec()
        return {...note, username: user.username}
    }))
    res.json(notesWithUser)
})

// @desc Create new notes
// @route POST /notes
// @access Private
const createNewNotes = asyncHandler(async (req, res) => {
    const {user, title, text} = req.body

    //Confirmation des donnees
    if(!user || !title || !text) {
        return res.status(404).json({ message: 'All fields are required'})
    }

    //Verifier s'il y'a les doublons(duplication)
    const duplicate = await Note.findOne({ title }).lean().exec()

    if(duplicate) {
        return res.status(409).json({ message: 'Duplicate notename found'})
    }

    //Create and store new note
    const note = await Note.create({user, title, text})

    if(note) {
        res.status(201).json({ message: `New note  created`})
    } else {
        res.status(400).json({ message: `Invalid note data received`})
    }
})

// @desc Update a notes
// @route PATCH /notes
// @access Private
const updateNotes = asyncHandler(async (req, res) => {
    const { id, user, title, text, completed } = req.body

    //Confirm data
    if(!id || !user || !title || !text|| typeof completed !== 'boolean') {
        return res.status(400).json({ message : 'All fields are required'})
    }

    const note = await Note.findById(id).exec()

    if(!note) {
        return res.status(400).json({ message : 'Note not found'})
    }

    //Check for duplicate
    const duplicate =  await Note.findOne({ title }).lean().exec()

    //Allow renaming to the original note
    if(duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({ message: 'Duplicate note title'})
    }

    note.user = user
    note.title = title
    note.completed = completed

    const updatedNote = await note.save()

    res.json({ message: `${updatedNote.title} updated` })
})

// @desc Delete a notes
// @route DELETE /notes
// @access Private
const deleteNotes = asyncHandler(async (req, res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({ message: 'Note ID Required'})
    }

    //Confirm note exists to delete
    
    const note = await Note.findById(id).exec()

    if(!note) {
        return res.status(400).json({ message: 'Note not found'})
    }

    const result = await note.deleteOne()

    const reply = `Note ${result.title} with ID ${result._id} deleted`

    res.json(reply)
})

module.exports = {
    getAllNotes,
    createNewNotes,
    updateNotes,
    deleteNotes
}