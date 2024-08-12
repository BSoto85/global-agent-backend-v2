// DEPENDENCIES
const cors = require("cors");
const express = require("express");
require("dotenv").config();

const digitalOceanUrl = process.env.DIGITAL_OCEAN_URL;

const { CronJob } = require("cron");
const authController = require("./controllers/authController");
const countriesController = require("./controllers/countriesController");
const youngerQuestionsController = require("./controllers/youngerQuestionsController");
const questionsOlderController = require("./controllers/questionsOlderController");
const statsController = require("./controllers/statsController");
const caseFilesController = require("./controllers/caseFilesController");
const profileController = require("./controllers/profileController");

// CONFIGURATION
const app = express();

app.use(cors());

app.use((req, _res, next) => {
  console.log("Origin Requested:", req.headers.origin);
  next();
});

app.use(express.json());

app.use("/api/auth", authController);
app.use("/api/countries", countriesController);
app.use("/api/younger_questions", youngerQuestionsController);
app.use("/api/older_questions", questionsOlderController);
app.use("/api/stats", statsController);
app.use("/api/case_files", caseFilesController);
app.use("/api/profile", profileController);

// Function to call world news endpoint and start case files controller GET
const getWorldNews = async () => {
  try {
    const response = await fetch(
      `${digitalOceanUrl}/api/case_files/world_news`
    );
    console.log(
      "Request made to the endpoint, response status:",
      response.status
    );
  } catch (error) {
    console.error("Error making request to the endpoint:", error);
  }
};

// Set get world news function to be invoked every day at 7am
// const job = new CronJob(
//   "0 7 * * * ", // cronTime
//   getWorldNews, // onTick
//   null, // onComplete
//   true, // start
//   "America/New_York", // timeZone
//   function () {
//     console.log(new Date());
//   }
// );

// job.start();

// ROUTES
app.get("/", (_req, res) => {
  res.send("Welcome to Global Agent Backend Server");
});

// 404 PAGE
app.get("*", (_req, res) => {
  res.status(404).send("Page not found");
});

// EXPORT
module.exports = app;
