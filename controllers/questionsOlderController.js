const express = require("express");
const older_questions = express.Router();
const { getAllOlderQuestions } = require("../queries/ai");
// const {getAllOlderQuestionsAndAnswers} = require("../queries/questionsOlder")

//http://localhost:3003/api/older_questions
older_questions.get("/", async (req, res) => {
  const getAllQuestionsAndAnswers = await getAllOlderQuestions();
  if (getAllQuestionsAndAnswers[0]) {
    res.status(200).json(getAllQuestionsAndAnswers);
  } else {
    res.status(500).json({ error: "Error fetching younger questions" });
  }
});

// QUESTIONS and ANSWERS http://localhost:3003/api/older_questions/1
older_questions.get("/:case_files_id", async (req, res) => {
  const { case_files_id } = req.params;
  const allQuestionsWithAnswers = await getAllOlderQuestionsAndAnswers(
    case_files_id
  );

  if (allQuestionsWithAnswers[0]) {
    res.status(200).json(allQuestionsWithAnswers);
  } else {
    res.status(500).json({ error: "Error fetching questions and answers" });
  }
});

module.exports = older_questions;
