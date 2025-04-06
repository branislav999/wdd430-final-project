const express = require('express');
const router = express.Router();
const Job = require('../models/job.model');

router.get('/', async (req, res) => {
  const jobs = await Job.find();
  res.json(jobs);
});

router.get('/:id', async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).json({ message: 'Job not found' });
  res.json(job);
});

router.post('/', async (req, res) => {
  const job = new Job(req.body);
  await job.save();
  res.status(201).json(job);
});

router.put('/:id', async (req, res) => {
  const updated = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updated) return res.status(404).json({ message: 'Job not found' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const deleted = await Job.findByIdAndDelete(req.params.id);
  if (!deleted) return res.status(404).json({ message: 'Job not found' });
  res.json({ message: 'Job deleted' });
});

module.exports = router;
