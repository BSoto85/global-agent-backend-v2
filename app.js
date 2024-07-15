// DEPENDENCIES
const cors = require("cors");
const express = require("express");

const authController = require("./controllers/authController");
const countriesController = require("./controllers/countriesController");
const youngerQuestionsController = require("./controllers/youngerQuestionsController");
const questionsOlderController = require("./controllers/questionsOlderController");
const statsController = require("./controllers/statsController");
const caseFilesController = require("./controllers/caseFilesController");
// const youngerQuestionsController = require("./controllers/aiController");
const profileController = require("./controllers/profileController")

// CONFIGURATION
const app = express();
 const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
 }
 app.use(cors(corsOptions))

// MIDDLEWARE
// app.use(cors({
//   origin: "http://localhost:3000"
//   // origin: ["https://main--fridgem8.netlify.app", "http://localhost:3000"]
// }));



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
// app.use("/api/younger", aiController);
app.use("/api/profile", profileController);

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
