const QA = require('../models/QA')

module.exports.createQuestion = async (req, res, next) => {
  try {
    const question = await QA.create(req.body)
    return res
      .status(200)
      .json({ status: 'success', data: question, message: 'Create Question Success' })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
}

module.exports.deleteQuestion = async (req, res, next) => {
  const { qaId } = req.params
  try {
    await QA.deleteOne({ _id: qaId })
    return res.status(200).json({ status: 'success', message: 'Delete Question Success' })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
}

module.exports.updateQuestion = async (req, res, next) => {
  const { qaId } = req.params
  try {
    await QA.findByIdAndUpdate(qaId, req.body, { new: true })
    return res.status(200).json({ status: 'success', message: 'Update Question Success' })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
}

module.exports.settingMails = async (req, res, next) => {}

module.exports.exportExcel = async (req, res, next) => {}
