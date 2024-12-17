const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'In Progress', 'Completed'],
        default: 'Pending'
    },
    progress: {
        type: Number,
        default: 0
    }, // percentage
});

module.exports = mongoose.model('Project', projectSchema);
