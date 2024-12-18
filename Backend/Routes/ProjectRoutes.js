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

// Update your route to fetch all projects
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find();  // This will fetch all projects
        res.status(200).send(projects);
    } catch (err) {
        res.status(500).send(err);
    }
});


// Update project status
router.put('/:projectId', async (req, res) => {
    try {
        const { status, progress } = req.body;
        const updateFields = {};

        // If status is provided, update the status
        if (status) {
            updateFields.status = status;
        }

        // If progress is provided, update the progress
        if (progress !== undefined) {
            // Make sure progress is a valid number between 0 and 100
            if (progress >= 0 && progress <= 100) {
                updateFields.progress = progress;
            } else {
                return res.status(400).send("Progress must be a number between 0 and 100.");
            }
        }

        // Find the project by ID and update the fields
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.projectId,
            { $set: updateFields },
            { new: true } // Return the updated project
        );

        if (!updatedProject) {
            return res.status(404).send("Project not found");
        }

        res.status(200).json(updatedProject);
    } catch (err) {
        res.status(500).send("Error updating project");
    }
});


module.exports = router;
