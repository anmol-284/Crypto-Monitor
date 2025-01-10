const express = require("express");
const CryptoData = require("../models/CryptoData");

const router = express.Router();

router.get("/stats", async (req, res) => {
  const { coin } = req.query;

  // Validate the `coin` query parameter
  if (!coin) {
    return res.status(400).json({ error: "Coin query parameter is required." });
  }

  try {
    console.log(`Fetching stats for coin: ${coin}`);

    // Find the latest data for the requested coin
    const crypto = await CryptoData.findOne({ coinId: coin.toLowerCase() });

    if (!crypto) {
      console.warn(
        `Cryptocurrency data not found for coin: ${coin.toLowerCase()}`
      ); // Debug log
      return res.status(404).json({ error: "Cryptocurrency not found." });
    }

    // Format the response
    const response = {
      price: crypto.currentPrice,
      marketCap: crypto.marketCap,
      "24hChange": crypto.change24h,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error fetching stats:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

const calculateStandardDeviation = (prices) => {
  const n = prices.length;

  // Calculate mean
  const mean = prices.reduce((sum, price) => sum + price, 0) / n;

  // Calculate variance
  const variance =
    prices.reduce((sum, price) => sum + Math.pow(price - mean, 2), 0) / n;

  // Return the square root of variance as the standard deviation
  return Math.sqrt(variance);
};

router.get("/deviation", async (req, res) => {
  const { coin } = req.query;

  // Validate the `coin` query parameter
  if (!coin) {
    return res.status(400).json({ error: "Coin query parameter is required." });
  }

  try {
    // Fetch the last 100 records for the specified coin
    const records = await CryptoData.find({ coinId: coin.toLowerCase() })
      .sort({ _id: -1 }) // Sort by newest first
      .limit(100);

    if (records.length === 0) {
      return res
        .status(404)
        .json({ error: "No data found for the requested coin." });
    }

    // Extract prices from the records
    const prices = records.map((record) => record.currentPrice);

    // Calculate standard deviation
    const deviation = calculateStandardDeviation(prices);

    // Return the response
    res.status(200).json({ deviation: parseFloat(deviation.toFixed(2)) });
  } catch (error) {
    console.error("Error calculating standard deviation:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

module.exports = router;
