const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: String, // URL of product image
  price: {
    type: Number,
    required: true,
  },
  category: String,
  link: String, // Optional: External product page (Walmart/Amazon etc.)
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
