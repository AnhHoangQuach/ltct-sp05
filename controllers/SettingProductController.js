const SettingProduct = require('../models/SettingProduct')
const SettingProductCategory = require('../models/SettingProductCategory')
const { checkExistBetweenTwoArray } = require('../utils/helpers')

module.exports.getAll = async (req, res, next) => {
  try {
    const settings = await SettingProduct.find()
    return res.status(200).json({ status: 'success', data: settings })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}

module.exports.create = async (req, res, next) => {
  const { value, categories } = req.body
  try {
    const productSettingExist = await SettingProduct.findOne({ value })
    if (productSettingExist) {
      return res.status(404).json({ status: 'error', message: 'Value Setting Product Exist' })
    }

    const getAllCategories = await SettingProductCategory.find().select('_id')
    const newMap = getAllCategories.map((item) => item._id.toString())

    if (!checkExistBetweenTwoArray(newMap, categories)) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Setting Product Category Not Found' })
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
  const { value, categories, priceIncrease } = req.body
  try {
    const settingProduct = await SettingProduct.findOne({ _id: settingProductId })
    if (!settingProduct) {
      return res.status(200).json({
        status: 'error',
        message: 'Setting Product Not Found',
      })
    }

    const getAllCategories = await SettingProductCategory.find().select('_id')
    const newMap = getAllCategories.map((item) => item._id.toString())

    if (!checkExistBetweenTwoArray(newMap, categories)) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Setting Product Category Not Found' })
    } else {
      settingProduct.value = value
      settingProduct.categories = categories
      settingProduct.priceIncrease = priceIncrease
      await settingProduct.save()
      return res.status(200).json({
        status: 'success',
        message: 'Update Setting Product',
      })
    }
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}

module.exports.deleteSetting = async (req, res, next) => {
  const { settingProductId } = req.params
  try {
    const settingProduct = await SettingProduct.findOne({ _id: settingProductId })
    if (!settingProduct) {
      return res.status(200).json({
        status: 'error',
        message: 'Setting Product Not Found',
      })
    }

    await SettingProduct.deleteOne({ _id: settingProductId })
    return res.status(200).json({
      status: 'success',
      message: 'Deleted Setting Product',
    })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}
