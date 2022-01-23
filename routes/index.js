const express = require('express')
const settingProductRouter = require('./settingProduct')
const settingProductCategoryRouter = require('./settingProductCategory')
const systemRouter = require('./system')
const shopRouter = require('./shop')

const apiRouter = express.Router()

apiRouter.use('/setting-product', settingProductRouter)

apiRouter.use('/setting-product-category', settingProductCategoryRouter)

apiRouter.use('/system', systemRouter)

apiRouter.use('/shop', shopRouter)

module.exports = apiRouter
