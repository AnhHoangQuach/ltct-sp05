const mongoose = require('mongoose')

const QASchema = new mongoose.Schema({
  content: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const QA = mongoose.model('QA', QASchema)
module.exports = QA
