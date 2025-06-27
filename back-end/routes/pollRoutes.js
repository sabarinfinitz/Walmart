const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const {
  createPoll,
  voteOnPoll,
  getPollResults,
} = require('../controllers/pollController');

router.post('/create', auth, createPoll);
router.post('/:pollId/vote', auth, voteOnPoll);
router.get('/:pollId/results', auth, getPollResults);

module.exports = router;
