const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const Question = require('../models/AdminQuestion');
const Result = require('../models/AdminResult');

// Get all students
router.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// Get top 5 students
router.get('/top-students', async (req, res) => {
  try {
    const topStudents = await Student.find()
      .sort({ marks: -1 })
      .limit(5)
      .select('username email marks uv pv'); 

    res.status(200).json(topStudents);
  } catch (error) {
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});
// Add a new student
router.post('/add-student', async (req, res) => {
  const { name, marks, class: studentClass, subject, pass } = req.body;
  try {
    const newStudent = new Student({ name, marks, class: studentClass, subject, pass });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    res.status(400).json({ message: 'Failed to add student: ' + error.message });
  }
});

// Add a new question
router.post('/add-question', async (req, res) => {
  try {
    const { question, a, b, c, d, correct } = req.body;
    const newQuestion = new Question({ question, a, b, c, d, correct });
    await newQuestion.save();
    res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: 'Failed to add question: ' + err.message });
  }
});

// Get all questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json({ count: questions.length });
  } catch (err) {
    res.status(500).json({ message: 'Failed to get questions: ' + err.message });
  }
});

// Add a new result
router.post('/add-result', authenticateToken, async (req, res) => {
  const { username, email, status, totalPoints, pointsEarned, pv, uv } = req.body;

  try {
      if (!username || !email || status === undefined || totalPoints === undefined || pointsEarned === undefined) {
          return res.status(400).json({ message: "Missing required fields" });
      }

      const result = new Result({
          username,
          email,
          status,
          totalPoints,
          pointsEarned,
          pv,
          uv
      });

      await result.save();
      res.status(201).json({ message: "Result saved successfully", result });
  } catch (error) {
      console.error('Error saving result:', error);
      res.status(500).json({ message: "Server error" });
  }
});


// Get all results
router.get('/Admin-results', async (req, res) => {
  try {
    const results = await Result.find();
    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching results:', error);
    res.status(500).json({ message: 'Error fetching results', error });
  }
});

module.exports = router;







module.exports = router;
