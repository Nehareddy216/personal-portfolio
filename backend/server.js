const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('MongoDB Connected Successfully');
})
.catch((err) => {
  console.log('MongoDB Connection Error');
  console.log(err.message);
});

const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model('Contact', contactSchema);
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  githubLink: String,
  image: String
});

const Project = mongoose.model('Project', projectSchema);

app.get('/', (req, res) => {
  res.send('Backend Server Running 🚀');
});

app.post('/contact', async (req, res) => {

  try {

    const newContact = new Contact({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message
    });

    await newContact.save();

    console.log('Data Saved To MongoDB');

    res.json({
      message: 'Contact saved successfully'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error saving contact'
    });

  }

});
// ADD PROJECT
app.post('/projects', async (req, res) => {

  try {

    const newProject = new Project({
      title: req.body.title,
      description: req.body.description,
      githubLink: req.body.githubLink,
      liveLink: req.body.liveLink,
      image: req.body.image
    });

    await newProject.save();

    console.log('Project Saved To MongoDB');

    res.json({
      message: 'Project added successfully'
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error saving project'
    });

  }

});


// GET PROJECTS
app.get('/projects', async (req, res) => {

  try {

    const projects = await Project.find();

    res.json(projects);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Error fetching projects'
    });

  }

});
console.log('NEW SERVER CODE LOADED');

app.listen(8000, () => {
  console.log('Server running on port 8000');
});