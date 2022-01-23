const QA = require('../models/QA')
const SettingProductCategory = require('../models/SettingProductCategory')
const Shop = require('../models/Shop')
const excelJS = require('exceljs')

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

module.exports.settingMails = async (req, res, next) => {
  const { code, emailContent } = req.body
  if (!code) {
    return res.status(400).json({ status: 'error', message: 'Missing Shop Code' })
  }
  try {
    const shopExist = await Shop.findOne({ code })
    if (!shopExist) {
      return res.status(404).json({ status: 'error', message: 'Shop Not Exist' })
    }
    shopExist.emailContent = emailContent
    await shopExist.save()
    return res.status(200).json({ status: 'success', message: 'Setting Email Success' })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
}

module.exports.exportExcel = async (req, res, next) => {
  const workbook = new excelJS.Workbook() // Create a new workbook
  const worksheet = workbook.addWorksheet('System Setting Product Categories') // New Worksheet
  // Column for data in excel. key must match data key
  worksheet.columns = [
    { header: 'Name', key: 'name', width: 10 },
    { header: 'CreatedAt', key: 'createdAt', width: 10 },
    { header: 'UpdatedAt', key: 'updatedAt', width: 10 },
  ]
  // Looping through User data
  const dataSettingCategory = await SettingProductCategory.find()
  dataSettingCategory.forEach((category) => {
    worksheet.addRow(category) // Add data in worksheet
  })
  // Making first line in excel bold
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true }
  })
  try {
    var fileName = 'settings-product-categories-' + new Date().getTime() + '.xlsx'
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )
    res.setHeader('Content-Disposition', 'attachment; filename=' + fileName)

    await workbook.xlsx.write(res)
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
}
