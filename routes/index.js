const express = require('express')
const settingProductRouter = require('./settingProduct')
const settingProductCategoryRouter = require('./settingProductCategory')
const systemRouter = require('./system')

const apiRouter = express.Router()

apiRouter.use('/setting-product', settingProductRouter)

apiRouter.use('/setting-product-category', settingProductCategoryRouter)

apiRouter.use('/system', systemRouter)

module.exports = apiRouter
