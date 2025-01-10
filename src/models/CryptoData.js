const mongoose = require("mongoose");

const cryptoDataSchema = new mongoose.Schema(
  {
    coinId: { type: String, required: true, unique: true }, // Unique coin identifier
    name: { type: String, required: true }, // Name of the cryptocurrency
    symbol: { type: String, required: true }, // Symbol of the cryptocurrency
    currentPrice: { type: Number, required: true }, // Current price in USD
    marketCap: { type: Number }, // Market cap in USD
    change24h: { type: Number }, // 24-hour change percentage
  },
  { timestamps: true } // Add createdAt and updatedAt timestamps
);

module.exports = mongoose.model("CryptoData", cryptoDataSchema);
