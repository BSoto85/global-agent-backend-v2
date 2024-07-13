const express = require("express");
require("dotenv").config();
const case_files = express.Router();
const { getAllCountries } = require("../queries/countries");
const {
  getCaseFilesByCountry,
  getLatestCaseFile,
  getAllNewCaseFiles,
} = require("../queries/caseFiles");
const deleteOldCaseFiles = require("../helpers/deleteOldCaseFiles");
const addArticles = require("../helpers/addArticles");
const { getSummaries } = require("../helpers/aiGetSummary");
const { addSummaries } = require("../helpers/addSummaries");
const {
  generateQuestionsAndAnswers,
} = require("../helpers/aiGenerateQuestions");
const { addYoungerQuestionAndAnswers } = require("../queries/ai");
const translateText = require("../helpers/translateText");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// http://localhost:3003/api/case_files/news-from-australia
case_files.get("/news-from-australia", async (req, res) => {
  try {
    // translateText("Hello World!", "es")
    await deleteOldCaseFiles();
    const checkCaseFiles = await getAllNewCaseFiles();
    if (!checkCaseFiles[0]) {
      const allCountries = await getAllCountries();
      if (!allCountries[0]) {
        // res.status(500).json({ error: "Error fetching countries" });
        throw new Error(" Error fetching countries");
      }
      const addedArticles = await addArticles(allCountries);
      // res.status(200).json({ message: "Success adding articles!" })
      // console.log(`Success adding ${addedArticles.length} articles!`);
      if (addedArticles.length > 0) {
        await addSummaries(addedArticles);
        // console.log("Result", result);
      }
      const getCaseFiles = await getAllNewCaseFiles();
      let i = 0;
      for (const file of getCaseFiles) {
        const getQuestionsAndAnswers = await generateQuestionsAndAnswers(file);
        console.log("--------", getQuestionsAndAnswers.questionsForYounger[0]);
        await delay(500);
        const addedYoungerQuestionAndAnswers =
          await addYoungerQuestionAndAnswers(
            getQuestionsAndAnswers.questionsForYounger,
            file.article_id
          );
        i++;
        await delay(1000);
        console.log(
          "Younger questions and answers",
          addedYoungerQuestionAndAnswers
        );
      }
      res.status(200).json({ message: "Added Summaries" });
    } else {
      res.status(200).json({ message: "Articles are up to date" });
      // console.log("Articles are up to date");
    }
  } catch (error) {
    // console.error("Error fetching news:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//INDEX CASE FILES http://localhost:3003/api/case_files/1
case_files.get("/:countries_id", async (req, res) => {
  const { countries_id } = req.params;
  const allCaseFilesByCountry = await getCaseFilesByCountry(countries_id);
  // console.log("Case files by country", allCaseFilesByCountry);
  if (allCaseFilesByCountry[0]) {
    res.status(200).json(allCaseFilesByCountry);
  } else {
    res.status(500).json({ error: "Error fetching case files" });
  }
});

module.exports = case_files;
