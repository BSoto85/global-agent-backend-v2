const Anthropic = require("@anthropic-ai/sdk");
const anthropic = new Anthropic();
const {
  systemPromptForArticleQuestions,
  hardCodedArticleSummary,
} = require("./aiData");

//http://localhost:3003/api/ai/questions
const generateQuestionsAndAnswers = async (file) => {
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
            text: file.summary_young + file.summary_old,
          },
        ],
      },
    ],
  });
  // }
  // console.log(
  //   "*******",
  //   JSON.parse(articleQuestionsAndAnswers.content[0].text)
  // );
  return JSON.parse(articleQuestionsAndAnswers.content[0].text);
};

module.exports = { generateQuestionsAndAnswers };
