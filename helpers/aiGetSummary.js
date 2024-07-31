const Anthropic = require("@anthropic-ai/sdk");
const anthropic = new Anthropic();
const { systemPromptForArticleSummary } = require("../helpers/aiData");
const { updateYoungerSummary, updateOlderSummary } = require("../queries/ai");

const getSummaries = async (content, article_id) => {
  const articleSummary = await anthropic.messages.create({
    model: "claude-3-5-sonnet-20240620",
    max_tokens: 4096,
    temperature: 0,
    system: systemPromptForArticleSummary,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: content,
          },
        ],
      },
    ],
  });

  const youngerSummary = articleSummary.content[0].text;
  const olderSummary = articleSummary.content[0].text;

  const updatedYoungerSummary = await updateYoungerSummary(
    youngerSummary,
    article_id
  );
  const updatedOlderSummary = await updateOlderSummary(
    olderSummary,
    article_id
  );

  if (updatedYoungerSummary && updatedOlderSummary) {
    return {
      ...updatedYoungerSummary,
      ...updatedOlderSummary,
      article_id: article_id,
    };
  }
};

module.exports = { getSummaries };
