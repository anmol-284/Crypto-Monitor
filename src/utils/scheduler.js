const cron = require("node-cron");
const saveCryptoData = require("../jobs/FetchCryptoData");

const scheduleJobs = () => {
  // Runs every 2 hrs
  cron.schedule("0 */2 * * *", async () => {
    console.log("Scheduled job started at:", new Date().toISOString());
    try {
      await saveCryptoData();
      console.log("Scheduled job completed successfully.");
    } catch (error) {
      console.error("Error in scheduled job:", error.message);
    }
  });
};

module.exports = { scheduleJobs };
