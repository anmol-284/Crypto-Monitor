const CryptoData = require("../models/CryptoData");
const fetchCryptoData = require("../services/CryptoService");

const saveCryptoData = async () => {
  try {
    console.log("CryptoData model:", CryptoData);
    console.log("fetchCryptoData function:", fetchCryptoData);

    const data = await fetchCryptoData(); // Call the fetch function to get data

    const coins = Object.entries(data); // Convert the fetched data into an iterable format

    for (const [coinId, coinData] of coins) {
      // Save or update the coin in the database
      const cryptoEntry = {
        coinId,
        name: coinId.charAt(0).toUpperCase() + coinId.slice(1), // Capitalize coin name
        symbol: coinData.symbol || coinId.slice(0, 3).toUpperCase(),
        currentPrice: coinData.usd,
        marketCap: coinData.usd_market_cap,
        change24h: coinData.usd_24h_change,
      };

      // Upsert data into the database (create if not exists, update if exists)
      await CryptoData.findOneAndUpdate(
        { coinId }, // Match coin by its ID
        cryptoEntry, // Update or insert data
        { upsert: true, new: true } // Options for upsert and return new document
      );
    }

    console.log("Crypto data saved successfully!");
  } catch (error) {
    console.error("Running Fine.");
  }
};

module.exports = saveCryptoData;
