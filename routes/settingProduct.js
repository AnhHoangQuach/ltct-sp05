const express = require('express')
const settingProductRouter = express.Router()

const { create } = require('../controllers/SettingProductController')

settingProductRouter.post('/create', create)

module.exports = settingProductRouter
