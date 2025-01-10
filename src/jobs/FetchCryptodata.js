const CryptoData = require("../models/CryptoData");
const fetchCryptoData = require("../services/CryptoService");

const saveCryptoData = async () => {
  try {
    const cryptoData = await fetchCryptoData();
    for (const [coinId, details] of Object.entries(cryptoData)) {
      await CryptoData.findOneAndUpdate(
        { coinId },
        {
          coinId,
          name: coinId,
          symbol: details.symbol,
          currentPrice: details.usd,
          marketCap: details.usd_market_cap,
          change24h: details.usd_24h_change,
        },
        { upsert: true }
      );
    }
    console.log("Crypto data updated successfully");
  } catch (err) {
    console.error("Error saving crypto data:", err.message);
  }
};

module.exports = { saveCryptoData };
