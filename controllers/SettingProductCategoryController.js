const SettingProductCategory = require('../models/SettingProductCategory')
const SettingProduct = require('../models/SettingProduct')

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

module.exports.updateCategory = async (req, res, next) => {
  const { productCategoryId } = req.params
  try {
    const categoryExist = await SettingProductCategory.findOne({ _id: productCategoryId })
    if (!categoryExist) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Setting Product Category Not Exist' })
    }

    categoryExist.name = req.body.name
    await categoryExist.save()
    return res.status(200).json({
      status: 'success',
      message: 'Updated Setting Product Category',
    })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}

module.exports.deleteCategory = async (req, res, next) => {
  const { productCategoryId } = req.params
  try {
    const categoryExist = await SettingProductCategory.findOne({ _id: productCategoryId })
    if (!categoryExist) {
      return res
        .status(404)
        .json({ status: 'error', message: 'Setting Product Category Not Exist' })
    }

    await SettingProductCategory.deleteOne({ _id: productCategoryId })
    const settingsProduct = await SettingProduct.find()

    settingsProduct.forEach(async (item) => {
      let index = item.categories.indexOf(productCategoryId)
      if (index > -1) {
        item.categories.splice(index, 1)
        await item.save()
      }
    })

    return res.status(200).json({ status: 'success', message: 'Deleted Setting Product Category' })
  } catch (error) {
    return res.status(500).json({ status: 'error', message: error.message })
  }
}
