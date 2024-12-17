const express = require('express');
const Project = require('../DataModel/ProjectModel');
const router = express.Router();

// Assign a project
router.post('/assign-project', async (req, res) => {
    try {
        const project = new Project(req.body);
        await project.save();
        res.status(201).send(project);
    }
    catch (err) {
        res.status(500).send(err);
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
