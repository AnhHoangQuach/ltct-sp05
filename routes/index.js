const express = require('express')
const settingProductRouter = require('./settingProduct')
const settingProductCategoryRouter = require('./settingProductCategory')

const apiRouter = express.Router()

apiRouter.use('/setting-product', settingProductRouter)

apiRouter.use('/setting-product-category', settingProductCategoryRouter)

module.exports = apiRouter
