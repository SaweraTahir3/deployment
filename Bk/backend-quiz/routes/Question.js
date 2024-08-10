// routes/questions.js
const express = require('express');
const router = express.Router();
const Question = require('../Models/Question');

// Create a new question
router.post('/add', async (req, res) => {
  const { question, a, b, c, d, correct, subject } = req.body;

  console.log('Received data:', req.body);


  if (!question || !a || !b || !c || !d || !correct || !subject) {
    return res.status(400).json({ message: 'All fields are required.' })
  }

  const newQuestion = new Question({
    question,
    a,
    b,
    c,
    d,
    correct,
    subject
  });

  try {
    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all questions
router.get('/', async (req, res) => {
  try {
    const questions = await Question.find();
    console.log('Fetched questions:', questions); // Log fetched questions
    res.json(questions);
  } catch (err) {
    console.error('Error fetching questions:', err); // Log errors
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;