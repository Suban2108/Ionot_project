const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const projectRoutes = require('./Routes/ProjectRoutes');
app.use('/projects', projectRoutes);

const userRoutes = require('./Routes/UserRoutes');
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Ionot Project API');
  });
  
mongoose
  .connect('mongodb://127.0.0.1:27017/Ionotdb')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log(err));

app.listen(5001, () => console.log('Server running on port 5001'));
