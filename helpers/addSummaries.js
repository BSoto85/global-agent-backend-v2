const { getSummaries } = require("../helpers/aiGetSummary");
const { getAllNewCaseFiles } = require("../queries/caseFiles");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const addSummaries = async (addedArticles) => {
  try {
    // console.log(
    //   `Added ${addedArticles.length} articles in addSummaries function`
    // );
    for (const article of addedArticles) {
      await getSummaries(article.articleContent, article.articleId);
      await delay(250); // Delay of 1/4 second between requests
    }
    // const files = await getAllNewCaseFiles();
    // console.log(files);
  } catch (error) {
    console.error("Error in addSummaries:", error);
    throw error;
  }
};

module.exports = { addSummaries };
