const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome, this is our great service' });
});

module.exports = router;
