const mongoose = require('mongoose');

const { Schema } = mongoose;

const noteSchema = new Schema({
    createdDate: {
        type: Date,
        default: Date.now
    },
    content: {
        type: String,
        required: true
    }
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;