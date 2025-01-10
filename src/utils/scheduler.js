const cron = require("node-cron");
const { saveCryptoData } = require("../jobs/fetchCryptoData");

const scheduleJobs = () => {
  // Runs every 2 hours
  cron.schedule("0 */2 * * *", async () => {
    console.log("Running scheduled job to fetch crypto data...");
    await saveCryptoData();
  });
};

module.exports = { scheduleJobs };
