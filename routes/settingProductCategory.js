const express = require('express')
const settingProductCategoryRouter = express.Router()

const {
  create,
  getAll,
  updateCategory,
  deleteCategory,
} = require('../controllers/SettingProductCategoryController')

settingProductCategoryRouter.get('/', getAll)

settingProductCategoryRouter.post('/create', create)

settingProductCategoryRouter.patch('/:productCategoryId', updateCategory)

settingProductCategoryRouter.delete('/:productCategoryId', deleteCategory)

module.exports = settingProductCategoryRouter
