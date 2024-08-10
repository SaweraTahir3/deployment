const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  userId: String,
  score: Number,
  totalQuestions: Number
});

module.exports = mongoose.model('Result', resultSchema);