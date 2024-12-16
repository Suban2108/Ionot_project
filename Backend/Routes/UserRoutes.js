const express = require('express');
const User = require('../DataModel/UserModel');
const router = express.Router();

router.post('/login', async(req,res)=>{
    try {
        // Create and save the project directly using `Project.create`
        const user = await User.create(req.body);
        res.status(201).send(user);
    } catch (err) {
        console.error('Error creating project:', err.message); // Log error for debugging
        res.status(500).send({ error: err.message });
    }
})


module.exports = router;