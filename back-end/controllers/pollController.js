const Poll = require('../models/Poll');

// Create a new poll
exports.createPoll = async (req, res) => {
  try {
    const { wishlist, title, productIds, expiresAt } = req.body;

    const options = productIds.map((pid) => ({ product: pid, votes: [] }));

    const poll = await Poll.create({
      wishlist,
      title,
      options,
      expiresAt,
      creator: req.user.id,
    });

    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create poll' });
  }
};

// Vote on a poll
exports.voteOnPoll = async (req, res) => {
  try {
    const { pollId } = req.params;
    const { productId } = req.body;
    const userId = req.user.id;

    const poll = await Poll.findById(pollId);

    // Remove previous vote if exists
    poll.options.forEach((opt) => {
      opt.votes = opt.votes.filter((vote) => vote.user.toString() !== userId);
    });

    // Add vote
    const option = poll.options.find(opt => opt.product.toString() === productId);
    if (!option) return res.status(404).json({ error: 'Option not found' });

    option.votes.push({ user: userId });
    await poll.save();

    res.status(200).json({ message: 'Vote recorded' });
  } catch (err) {
    res.status(500).json({ error: 'Voting failed' });
  }
};

// Get poll results
exports.getPollResults = async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.pollId).populate('options.product');

    const results = poll.options.map((opt) => ({
      product: opt.product,
      votes: opt.votes.length,
    }));

    res.status(200).json({ title: poll.title, results });
  } catch (err) {
    res.status(500).json({ error: 'Failed to get poll results' });
  }
};
