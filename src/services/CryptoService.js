const axios = require("axios");

const COINGECKO_API_BASE = process.env.COINGECKO_API_BASE;

const fetchCryptoData = async () => {
  const ids = ["bitcoin", "matic-network", "ethereum"];
  const url = `${COINGECKO_API_BASE}/simple/price`;
  try {
    const { data } = await axios.get(url, {
      params: {
        ids: ids.join(","),
        vs_currencies: "usd",
        include_market_cap: true,
        include_24hr_change: true,
      },
    });
    return data;
  } catch (err) {
    console.error("Error fetching data from CoinGecko:", err.message);
    throw err;
  }
};

module.exports = fetchCryptoData;
