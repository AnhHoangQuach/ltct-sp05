const mongoose = require('mongoose')

const SettingProductCategorySchema = new mongoose.Schema({
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

const SettingProductCategory = mongoose.model(
  'SettingProductCategory',
  SettingProductCategorySchema
)
module.exports = SettingProductCategory
