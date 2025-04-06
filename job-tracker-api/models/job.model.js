const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  status: { type: String, required: true },
  dateApplied: String,
  notes: String,
});

module.exports = mongoose.model('Job', jobSchema);
