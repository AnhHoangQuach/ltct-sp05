const Shop = require('../models/Shop')

module.exports.createShop = async (req, res, next) => {
  const { name, code, emailContent = '' } = req.body
  try {
    if (!name || !code) {
      return res.status(400).json({ status: 'error', message: 'Missing name or code' })
    }

    const shopExist = await Shop.findOne({ code })
    if (shopExist) {
      return res.status(404).json({ status: 'error', message: 'Shop Code Exist' })
    }
    const shop = await Shop.create({ name, code, emailContent })
    return res.status(200).json({ status: 'success', data: shop, message: 'Create Shop Success' })
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err.message })
  }
}
