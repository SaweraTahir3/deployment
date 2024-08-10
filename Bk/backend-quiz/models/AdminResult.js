// models/AdminResult.js
const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
  username: { type: String, required: false }, 
  email: { type: String, required: false },    
  status: { type: String, required: true },
  totalPoints: { type: Number, required: true },
  pointsEarned: { type: Number, required: true },
  pv: { type: Number, required: false, default: 0 }, 
  uv: { type: Number, required: false, default: 0 }  
}, { timestamps: true });

module.exports = mongoose.model('AdminResult', resultSchema);
