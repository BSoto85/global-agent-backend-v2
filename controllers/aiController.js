const express = require("express");
const ai = express.Router();
const Anthropic = require("@anthropic-ai/sdk");
const anthropic = new Anthropic();
const {
  systemPromptForArticleQuestions,
  hardCodedArticleSummary,
} = require("../helpers/aiData");
const { getAllNewCaseFiles } = require("../queries/caseFiles");
const {
  getAllYoungerQuestionsAndAnswers,
  getAllOlderQuestionsAndAnswers,
  getAllSummaries,
} = require("../queries/ai");

//http://localhost:3003/api/ai/questions
ai.get("/questions", async (req, res) => {
  // const allSummaries = await getAllSummaries();
  // for (const summary of allSummaries) {
  const articleQuestionsAndAnswers = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 4096,
    temperature: 0,
    system: systemPromptForArticleQuestions,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: hardCodedArticleSummary.text.textYounger,
          },
        ],
      },
    ],
  });
  // }
  console.log(JSON.parse(articleQuestionsAndAnswers.content[0].text));
});

module.exports = ai;
