const express = require('express');
const router = express.Router();
const Job = require('../models/job.model');

function mapId(doc) {
  const obj = doc.toObject();
  obj.id = obj._id;
  delete obj._id;
  delete obj.__v;
  return obj;
}

router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs.map(mapId));  
});

router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(mapId(job)); 
});


router.post('/', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json(mapId(job)); 
});

router.put('/:id', async (req, res) => {
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Job not found' });
  res.json(mapId(updated)); 
});


router.delete('/:id', async (req, res) => {
  const deleted = await Job.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Job not found' });
  res.json({ message: 'Job deleted' }); 
});

module.exports = router;
