const express = require("express");
const {
  generateQuestionsAndAnswers,
} = require("../helpers/aiGenerateQuestions");
const youngerQuestions = express.Router();

const { getAllYoungerQuestionsAndAnswers } = require("../queries/ai");
const { addYoungerQuestionAndAnswers } = require("../queries/ai");
const { getAllNewCaseFiles } = require("../queries/caseFiles");

//http://localhost:3003/api/younger_questions/:case_files_id
youngerQuestions.get("/:article_id", async (req, res) => {
  const { article_id } = req.params;
  const allYoungerquestions = await getAllYoungerQuestionsAndAnswers(
    article_id
  );
  if (allYoungerquestions[0]) {
    res.status(200).json(allYoungerquestions);
  } else {
    res.status(500).json({ error: "Error fetching younger questions" });
  }
});

// htttp://localhost:3003/api/younger_questions/:article_id
youngerQuestions.post("/:case_files_article_id", async (req, res) => {
  const getCaseFiles = await getAllNewCaseFiles();
  let i = 0;
  for (const file of getCaseFiles) {
    const getQuestionsAndAnswers = await generateQuestionsAndAnswers(file);
    const addedYoungerQuestionAndAnswers = await addYoungerQuestionAndAnswers(
      getQuestionsAndAnswers.questionsForYounger[i],
      file.article_id
    );
    i++;
    console.log(
      "Younger questions and answers",
      addedYoungerQuestionAndAnswers
    );
  }
});

module.exports = youngerQuestions;
