const Anthropic = require("@anthropic-ai/sdk");
const anthropic = new Anthropic();
const {
  systemPromptForArticleSummary,
  // hardCodedArticle,
} = require("../helpers/aiData");
const { updateYoungerSummary, updateOlderSummary } = require("../queries/ai");

const extractSummary = (str, key) => {
  const regex = new RegExp(`"${key}":\\s*"([^"]*)"`, "s");
  const match = str.match(regex);
  return match ? match[1] : null;
};

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

  const parsedYoung = extractSummary(
    articleSummary.content[0].text,
    "youngerSummary"
  );
  const parsedOld = extractSummary(
    articleSummary.content[0].text,
    "olderSummary"
  );
  // console.log("Article summary", articleSummary);
  // const parsedYoung = JSON.parse(articleSummary.content[0].text).youngerSummary;
  // const parsedOld = JSON.parse(articleSummary.content[0].text).olderSummary;
  // console.log(JSON.parse(articleSummary.content[0].text), "---------");
  // console.log("parsed young", parsedYoung);
  // console.log("parsed old", parsedOld);
  const updatedYoungerSummary = await updateYoungerSummary(
    parsedYoung,
    article_id
  );
  const updatedOlderSummary = await updateOlderSummary(parsedOld, article_id);
  // console.log("Younger", updatedYoungerSummary);
  // console.log("Older", updatedOlderSummary);

  if (updatedYoungerSummary && updatedOlderSummary) {
    return {
      ...updatedYoungerSummary,
      ...updatedOlderSummary,
      article_id: article_id,
    };
  }
  // if (updatedYoungerSummary[0]) {
  //   res
  //     .status(200)
  //     .json({ message: "Success in updating summary in case files" });
  // } else {
  //   res
  //     .status(500)
  //     .json({ message: "Server error, could not update summaries" });
  // }
  // console.log("Updated Summary", updatedSummary);
};

module.exports = { getSummaries };
