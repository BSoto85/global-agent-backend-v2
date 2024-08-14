const express = require("express");
require("dotenv").config();
const case_files = express.Router();
const { getAllCountries } = require("../queries/countries");
const {
  getCaseFilesByCountry,
  deleteOldArticles,
} = require("../queries/caseFiles");
const addArticles = require("../helpers/addArticles");
const { addSummaries } = require("../helpers/addSummaries");
const {
  generateQuestionsAndAnswers,
} = require("../helpers/aiGenerateQuestions");
const {
  addYoungerQuestionAndAnswers,
  addOlderQuestionAndAnswers,
} = require("../queries/ai");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Using delay to allow time for AI to generate responses and for them to be added to their respective tables
// https://global-agent-jwxj4.ondigitalocean.app/api/case_files/world_news
case_files.get("/world_news", async (req, res) => {
  try {
    // await deleteOldArticles();
    const allCountries = await getAllCountries();
    console.log("All countries in GET", allCountries);
    if (!allCountries[0]) {
      throw new Error(" Error fetching countries");
    }
    const addedArticles = await addArticles(allCountries);
    console.log(`*****Success adding ${addedArticles.length} articles!*****`);
    if (addedArticles.length === 0) {
      throw new Error(" Error adding articles");
    }
    const summariesArr = await addSummaries(addedArticles);

    for (const summary of summariesArr) {
      const getQuestionsAndAnswers = await generateQuestionsAndAnswers(summary);
      console.log("%%%%", getQuestionsAndAnswers);
      for (const question of getQuestionsAndAnswers.questionsForYounger) {
        await addYoungerQuestionAndAnswers(
          question,
          getQuestionsAndAnswers.article_id
        );
        await delay(500);
      }
      //For older questions
      for (const question of getQuestionsAndAnswers.questionsForOlder) {
        await addOlderQuestionAndAnswers(
          question,
          getQuestionsAndAnswers.article_id
        );
        await delay(500);
      }
    }
    res.status(200).json({ message: "Added Summaries and questions" });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

//INDEX CASE FILES https://global-agent-jwxj4.ondigitalocean.app/api/case_files/1
case_files.get("/:countries_id", async (req, res) => {
  const { countries_id } = req.params;
  const allCaseFilesByCountry = await getCaseFilesByCountry(countries_id);
  if (allCaseFilesByCountry[0]) {
    res.status(200).json(allCaseFilesByCountry);
  } else {
    res.status(500).json({ error: "Error fetching case files" });
  }
});

module.exports = case_files;
