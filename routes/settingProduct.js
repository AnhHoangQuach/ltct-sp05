const express = require('express')
const settingProductRouter = express.Router()

const {
  create,
  getAll,
  deleteSetting,
  updateSetting,
} = require('../controllers/SettingProductController')

settingProductRouter.get('/', getAll)

settingProductRouter.post('/create', create)

settingProductRouter.delete('/:settingProductId', deleteSetting)

settingProductRouter.patch('/:settingProductId', updateSetting)

module.exports = settingProductRouter
