const CryptoData = require("../models/CryptoData");
const axios = require("axios");

// CoinGecko API base URL
const COINGECKO_API_BASE =
  process.env.COINGECKO_API_BASE || "https://api.coingecko.com/api/v3";

// Fetch data from the CoinGecko API
const fetchCryptoData = async () => {
  console.log("Fetching crypto data from CoinGecko...");
  try {
    const response = await axios.get(
      `${COINGECKO_API_BASE}/simple/price?ids=bitcoin,matic-network,ethereum&vs_currencies=usd&include_market_cap=true&include_24hr_change=true`
    );
    console.log("Data fetched successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching data from CoinGecko:",
      error.response?.status,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Save fetched data to the database
const saveCryptoData = async () => {
  try {
    const data = await fetchCryptoData();

    const coins = Object.entries(data); // Convert the fetched data into an iterable format

    for (const [coinId, coinData] of coins) {
      // Prepare the data object for upsert
      const cryptoEntry = {
        coinId,
        name: coinId.charAt(0).toUpperCase() + coinId.slice(1), // Capitalize the coin name
        symbol: coinData.symbol || coinId.slice(0, 3).toUpperCase(),
        currentPrice: coinData.usd,
        marketCap: coinData.usd_market_cap,
        change24h: coinData.usd_24h_change,
      };

      // Upsert the data into the database
      await CryptoData.findOneAndUpdate(
        { coinId }, // Match by coin ID
        cryptoEntry, // Data to upsert
        { upsert: true, new: true } // Options to insert if not exists
      );
    }

    console.log("Crypto data saved successfully!");
  } catch (error) {
    console.error("Error saving crypto data:", error.message);
  }
};

module.exports = saveCryptoData;
