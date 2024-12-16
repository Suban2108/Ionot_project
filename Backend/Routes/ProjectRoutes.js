const express = require('express');
const Project = require('../DataModel/ProjectModel');
const router = express.Router();

// Assign a project
router.post('/assign', async (req, res) => {
    try {
        // Create and save the project directly using `Project.create`
        const project = await Project.create(req.body);
        res.status(201).send(project);
    } catch (err) {
        console.error('Error creating project:', err.message); // Log error for debugging
        res.status(500).send({ error: err.message });
    }
});


// Fetch all projects for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const projects = await Project.find({ assignedTo: req.params.userId });
        res.status(200).send(projects);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Update project status
router.put('/:projectId', async (req, res) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.projectId,
            req.body,
            { new: true }
        );
        res.status(200).send(project);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
