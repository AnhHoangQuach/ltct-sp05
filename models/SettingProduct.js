const mongoose = require('mongoose')

const SettingProductSchema = new mongoose.Schema({
  value: String,
  categories: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'SettingProductCategory',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const SettingProduct = mongoose.model('SettingProduct', SettingProductSchema)
module.exports = SettingProduct
