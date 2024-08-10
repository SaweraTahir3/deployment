// routes/results.js
const express = require('express');
const router = express.Router();
const Result = require('../models/Result');

// Submit quiz result
// router.post('/submit', async (req, res) => {
//   try {
//     const { userId, score, totalQuestions } = req.body;
//     const newResult = new Result({ userId, score, totalQuestions });
//     await newResult.save();
//     res.status(201).json(newResult);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// Get results for a user
router.get('/:userId', async (req, res) => {
  try {
    const results = await Result.find({ userId: req.params.userId });
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;