const express = require('express');

const router = express.Router();

router.get('/start', (req, res) => {
  res.send('Start with passion and love 💛🔥');
});

module.exports = router;
