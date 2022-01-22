const express = require('express')
const settingProductCategoryRouter = express.Router()

const { create, getAll } = require('../controllers/SettingProductCategoryController')

settingProductCategoryRouter.get('/', getAll)

settingProductCategoryRouter.post('/create', create)

module.exports = settingProductCategoryRouter
