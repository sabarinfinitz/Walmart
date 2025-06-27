const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Wishlist = require("../models/Wishlist");
const wishlistController = require("../controllers/wishlistController");

// Get wishlist by ID
router.get("/:id", auth, async (req, res) => {
  try {
    const wishlist = await Wishlist.findById(req.params.id).populate(
      "items.product"
    );
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishlist" });
  }
});

// Get all wishlists for the logged-in user
router.get("/", auth, async (req, res) => {
  try {
    const wishlists = await Wishlist.find({ members: req.user.id });
    res.json(wishlists);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch wishlists" });
  }
});

// Create a new wishlist
router.post("/", auth, wishlistController.createWishlist);

// Add item to wishlist
router.post("/:id/item", auth, wishlistController.addItem);

module.exports = router;
