const SettingProductCategory = require('../models/SettingProductCategory')

module.exports.getAll = async (req, res, next) => {
  try {
    const categories = await SettingProductCategory.find()
    return res.status(200).json({ status: 'success', data: categories })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}

module.exports.create = async (req, res, next) => {
  try {
    const categoryExist = await SettingProductCategory.findOne({ name: req.body.name })
    console.log(categoryExist)
    if (categoryExist) {
      return res.status(404).json({ status: 'error', message: 'Setting Product Category Exist' })
    }

    const newCategory = await SettingProductCategory.create({ name: req.body.name })
    return res
      .status(200)
      .json({ status: 'success', data: newCategory, message: 'Setting Product Category Created' })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}
