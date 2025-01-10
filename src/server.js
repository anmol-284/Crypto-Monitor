require("dotenv").config();
const routes = require("./routes/index");
const express = require("express");
const mongoose = require("mongoose");
const { scheduleJobs } = require("./utils/scheduler");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", routes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the scheduler
scheduleJobs();

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
