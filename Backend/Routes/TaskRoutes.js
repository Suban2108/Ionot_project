const express = require('express');
const router = express.Router();
const Task = require('../DataModel/TaskModel'); // Import your Task model
const Project = require('../DataModel/ProjectModel'); // Import your Project model
const User = require('../DataModel/UserModel'); // Import your User model

// Endpoint to upload (create) tasks for a project
router.post('/projects-tasks/:projectId', async (req, res) => {
    try {
        const { description } = req.body; // Array of task descriptions

        if (!description || !Array.isArray(description) || description.length === 0) {
            return res.status(400).json({ error: 'Description must be an array of task descriptions.' });
        }

        // Find the project by ID
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        // Create a single task with the description array
        const task = new Task({
            description: description, // Store the array of descriptions as a single task document
            project: req.params.projectId,
        });

        // Save the task to the database
        await task.save();

        // Add the task to the project (optional, if you want to store the task reference in the project model as well)
        project.tasks.push(task._id);
        await project.save();

        res.status(201).json({ message: 'Tasks uploaded successfully.', task });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/projects-tasks/:projectId', async (req, res) => {
    try {
        // Find tasks by projectId
        const tasks = await Task.find({ project: req.params.projectId });

        // If no tasks are found
        if (tasks.length === 0) {
            return res.status(404).json({ error: 'No tasks found for this project.' });
        }

        res.status(200).json({ tasks });
    } catch (err) {
        console.error('Error fetching tasks:', err);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
});


// Endpoint to update task progress
router.put('/projects-tasks/:projectId/:taskId/progress', async (req, res) => {
    try {
        const { descriptionIndex, progress } = req.body;

        if (progress < 0 || progress > 100) {
            return res.status(400).json({ error: 'Progress must be between 0 and 100.' });
        }

        const task = await Task.findById(req.params.taskId);
        if (!task) {
            return res.status(404).json({ error: 'Task not found.' });
        }

        if (!task.description[descriptionIndex]) {
            return res.status(404).json({ error: 'Description index out of range.' });
        }

        task.description[descriptionIndex].progress = progress;

        // Update status dynamically
        const allCompleted = task.description.every(desc => desc.progress === 100);
        const someInProgress = task.description.some(desc => desc.progress > 0 && desc.progress < 100);

        if (allCompleted) task.status = 'Completed';
        else if (someInProgress) task.status = 'In Progress';
        else task.status = 'Pending';

        await task.save();

        res.status(200).json({ message: 'Task progress updated.', task });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


module.exports = router;
