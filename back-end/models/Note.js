const mongoose = require('mongoose')

/*Les identifiant generer par mongodb sont trop long alors 
on utilise le mongoose-sequence pour generer autre moins long*/
const AutoIncrement = require('mongoose-sequence')(mongoose)
const noteSchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref:'User'
        },
        title: {
            type: String,
            required:true
        },
        text: {
            type: String,
            required:true
        },
        completed: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket',
    id: 'ticketNums',
    start_seq: 500
})

module.exports = mongoose.model('Note', noteSchema)