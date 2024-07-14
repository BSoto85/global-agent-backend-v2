const express = require("express");
const {
  generateQuestionsAndAnswers,
} = require("../helpers/aiGenerateQuestions");
const youngerQuestions = express.Router();

const { getAllYoungerQuestionsAndAnswers } = require("../queries/ai");
const {
  addYoungerQuestionAndAnswers,
  getAllYoungerQuestions,
} = require("../queries/ai");
const { getAllNewCaseFiles } = require("../queries/caseFiles");

//http://localhost:3003/api/younger_questions
youngerQuestions.get("/", async (req, res) => {
  const getAllQuestionsAndAnswers = await getAllYoungerQuestions();
  if (getAllQuestionsAndAnswers[0]) {
    res.status(200).json(getAllQuestionsAndAnswers);
  } else {
    res.status(500).json({ error: "Error fetching younger questions" });
  }
});

//http://localhost:3003/api/younger_questions/:case_files_id
youngerQuestions.get("/:article_id", async (req, res) => {
  const { article_id } = req.params;
  const allYoungerQuestions = await getAllYoungerQuestionsAndAnswers(
    article_id
  );
  console.log("&&&&&", allYoungerQuestions);
  if (allYoungerQuestions[0]) {
    res.status(200).json(allYoungerQuestions);
  } else {
    res.status(500).json({ error: "Error fetching younger questions" });
  }
});

// htttp://localhost:3003/api/younger_questions/:article_id
// youngerQuestions.post("/:case_files_article_id", async (req, res) => {
//   const getCaseFiles = await getAllNewCaseFiles();
//   for (const file of getCaseFiles) {
//     const getQuestionsAndAnswers = await generateQuestionsAndAnswers(file);
//     for (const question of getQuestionsAndAnswers) {
//       const addedYoungerQuestionAndAnswers = await addYoungerQuestionAndAnswers(
//         question,
//         file.article_id
//       );
//       console.log(
//         "Younger questions and answers",
//         addedYoungerQuestionAndAnswers
//       );
//     }
//   }
// });

module.exports = youngerQuestions;
