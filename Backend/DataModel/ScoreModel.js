const mongoose = require('mongoose');

const scoreShema = new mongoose.Schema({
    candidateID : {
        type: String,
        required: true
    },
    progress:{
        type: Number,
        required: true
    },
    score:{
        type:Number
    }
});

module.exports = mongoose.model('Score',scoreShema);