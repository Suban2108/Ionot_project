const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
    description: {
        type: [String], // Array of strings for task descriptions
        required: true
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProjectModel', // Ensure this matches your Project model's name
        required: true
    },
    progress: {
        type: Number, // Progress in percentage (0-100)
        default: 0,
        validate: {
            validator: (value) => value >= 0 && value <= 100,
            message: 'Progress must be between 0 and 100.'
        }
    },
    status: {
        type: String, // Task status
        enum: ['Pending', 'In Progress', 'Completed'], // Allowed values
        default: 'Pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create the Task model based on the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
