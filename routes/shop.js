const express = require('express')
const shopRouter = express.Router()

const { createShop } = require('../controllers/ShopController')

shopRouter.post('/create', createShop)

module.exports = shopRouter
