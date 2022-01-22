const SettingProduct = require('../models/SettingProduct')

module.exports.getAll = async (req, res, next) => {
  try {
    const settings = await SettingProduct.find()
    return res.status(200).json({ status: 'success', data: settings })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}

module.exports.create = async (req, res, next) => {
  try {
    const productSettingExist = await SettingProduct.findOne({ value: req.body.value })
    if (productSettingExist) {
      return res.status(404).json({ status: 'error', message: 'Value Setting Product Exist' })
    }

    const productSetting = await SettingProduct.create(req.body)
    return res.status(200).json({
      status: 'success',
      data: productSetting,
      message: 'Setting Product Created',
    })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}

module.exports.updateSetting = async (req, res, next) => {
  const { settingProductId } = req.params
  const { value, categories } = req.body
  try {
    const settingProduct = await SettingProduct.findOne({ _id: settingProductId })
    settingProduct.value = value
    settingProduct.categories = categories

    const afterSetting = await settingProduct.save()
    return res.status(200).json({
      status: 'success',
      data: afterSetting,
      message: 'Update Setting Product',
    })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}

module.exports.deleteSetting = async (req, res, next) => {
  const { settingProductId } = req.params
  try {
    await SettingProduct.deleteOne({ _id: settingProductId })
    return res.status(200).json({
      status: 'success',

      message: 'Deleted Setting Product',
    })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}
