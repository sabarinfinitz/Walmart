const mongoose = require('mongoose');

const pollSchema = new mongoose.Schema({
  wishlist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wishlist',
    required: true,
  },
  title: String,
  options: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      votes: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' } }],
    },
  ],
  expiresAt: Date,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Poll', pollSchema);
