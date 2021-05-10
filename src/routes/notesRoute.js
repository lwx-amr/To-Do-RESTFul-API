const express = require("express");

const router = express.Router();

router.get("/", function(req, res) {
    res.json({"message":"Welcome, this is our great service"})
})

module.exports = router;