const express = require('express')
const systemRouter = express.Router()

const {
  createQuestion,
  deleteQuestion,
  updateQuestion,
  settingMails,
  exportExcel,
} = require('../controllers/SystemController')

systemRouter.post('/qa/create', createQuestion)

systemRouter.patch('/qa/:qaId', updateQuestion)

systemRouter.delete('/qa/:qaId', deleteQuestion)

systemRouter.post('/email', settingMails)

systemRouter.get('/export-excel', exportExcel)

module.exports = systemRouter
