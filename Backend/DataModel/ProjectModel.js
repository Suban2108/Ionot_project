const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task', // Reference to the Task model
    }],
    description: {
        type: String,
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
    },
    name: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Declined', 'In Progress', 'Completed'],
        default: 'Pending',
    },
    progress: {
        type: Number,
        default: 0,
    }, // percentage
});

module.exports = mongoose.model('Project', projectSchema);
