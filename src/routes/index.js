const express = require("express");
const CryptoData = require("../models/CryptoData");

const router = express.Router();

router.get("/crypto", async (req, res) => {
  try {
    const data = await CryptoData.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
