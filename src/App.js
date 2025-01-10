require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const { scheduleJobs } = require("./utils/scheduler");

const app = express();

app.use(express.json());
app.use("/api", routes);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    scheduleJobs(); // Start background jobs
  })
  .catch((err) => console.error("Error connecting to MongoDB:", err));

module.exports = app;
