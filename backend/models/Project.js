const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  githubLink: {
    type: String,
    required: true
  },
  liveLink: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: false
  }
});

module.exports = mongoose.model('Project', projectSchema);