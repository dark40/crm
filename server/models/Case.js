const mongoose = require('mongoose');

const { Schema } = mongoose;

const caseSchema = new Schema({
    firstName: {
        type: String, 
        required: true,
        trim: true
    },
    lastName: {
        type: String, 
        required: true, 
        trim: true
    },
    bio: {
        type: String
    },
    dob: {
        type: Date
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Note'
        }
    ]
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;