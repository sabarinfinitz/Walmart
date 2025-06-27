const Wishlist = require("../models/Wishlist");

// 1. Create a new wishlist
exports.createWishlist = async (req, res) => {
  try {
    const { name } = req.body;
    const owner = req.user.id; // From JWT
    console.log("Creating wishlist for owner:", owner, "with name:", name);
    const wishlist = new Wishlist({
      name,
      owner,
      members: [owner], // Owner is also a member
    });
    await wishlist.save();
    res.status(201).json(wishlist);
  } catch (err) {
    console.error("Failed to create wishlist:", err);
    res
      .status(500)
      .json({ error: "Failed to create wishlist", details: err.message });
  }
};

// 2. Add item to wishlist
exports.addItem = async (req, res) => {
  try {
    const wishlistId = req.params.id;
    const { title, description, image, price, category, link } = req.body;
    console.log("Adding item to wishlist:", wishlistId, "product:", title);
    // Create product
    const Product = require("../models/Product");
    const product = await Product.create({
      title,
      description,
      image,
      price,
      category,
      link,
    });
    // Add product to wishlist
    const wishlist = await Wishlist.findById(wishlistId);
    wishlist.items.push({ product: product._id });
    await wishlist.save();
    res.status(200).json(wishlist);
  } catch (err) {
    console.error("Failed to add item:", err);
    res.status(500).json({ error: "Failed to add item", details: err.message });
  }
};

// 3. React to an item with emoji
exports.reactToItem = async (req, res) => {
  try {
    const { emoji } = req.body;
    const { wishlistId, itemId } = req.params;
    const userId = req.user.id;

    const wishlist = await Wishlist.findById(wishlistId);

    const item = wishlist.items.id(itemId);
    item.reactions.push({ user: userId, emoji });
    await wishlist.save();

    res.status(200).json({ message: "Reaction added" });
  } catch (err) {
    res.status(500).json({ error: "Failed to react" });
  }
};

// 4. Share wishlist by adding members
exports.shareWishlist = async (req, res) => {
  try {
    const { memberIds } = req.body; // Array of user IDs
    const wishlist = await Wishlist.findById(req.params.id);

    wishlist.members.push(...memberIds);
    await wishlist.save();

    res.status(200).json({ message: "Wishlist shared" });
  } catch (err) {
    res.status(500).json({ error: "Failed to share wishlist" });
  }
};
