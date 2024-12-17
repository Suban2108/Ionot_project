const express = require('express');
const router = express.Router();
const Project = require('../DataModel/ProjectModel'); // Import your Project model
const User = require('../DataModel/UserModel'); // Import your User model

router.put('/projects-tasks/:projectId/progress', async (req, res) => {
    try {
        const { progress } = req.body; // Progress in percentage (0 - 100)

        // Validate progress range
        if (progress < 0 || progress > 100) {
            return res.status(400).json({ error: 'Progress must be between 0 and 100.' });
        }

        // Find the project
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(404).json({ error: 'Project not found.' });
        }

        // Update progress and calculate score
        project.progress = progress;
        project.score = progress * 10; // Example scoring formula: progress * 10

        // Update project status dynamically
        if (progress === 100) project.status = 'Completed';
        else if (progress > 0) project.status = 'In Progress';
        else project.status = 'Pending';

        await project.save();

        // Update user's total score
        const user = await User.findById(project.assignedTo);
        if (user) {
            const userProjects = await Project.find({ assignedTo: user._id });
            const totalScore = userProjects.reduce((sum, p) => sum + (p.score || 0), 0);
            user.totalScore = totalScore;
            await user.save();
        }

        res.status(200).json({ message: 'Project progress updated.', project });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
