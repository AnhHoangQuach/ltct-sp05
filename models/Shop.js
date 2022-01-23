const mongoose = require('mongoose')

const ShopSchema = new mongoose.Schema({
  name: String,
  code: String,
  emailContent: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const Shop = mongoose.model('Shop', ShopSchema)
module.exports = Shop
