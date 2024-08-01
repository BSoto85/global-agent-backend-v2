const { addCaseFile } = require("../queries/caseFiles");
const translateText = require("../helpers/translateText");

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const URL = process.env.BASE_URL;
const key = process.env.NEWS_API_KEY;

function getFormattedDate() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const day =
    currentDate.getDate() === 1
      ? currentDate.getDate()
      : currentDate.getDate() - 1;

  // Function to ensure two digits for month and day
  const formatTwoDigits = (num) => (num < 10 ? "0" + num : num);

  const formattedDate = `${year}-${formatTwoDigits(month)}-${formatTwoDigits(
    day
  )}`;
  return formattedDate;
}

const yesterdaysDate = getFormattedDate();

async function addArticles(allCountries) {
  let addedArticles = [];

  for (let country of allCountries) {
    const url = `${URL}?source-country=${country.country_code}&language=${country.language_code}&date=${yesterdaysDate}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "x-api-key": key,
      },
    });
    const data = await response.json();
    const allArticles = data.top_news[0].news;
    const middle = Math.floor(allArticles.length / 2);
    const threeArticles = [
      allArticles[0],
      allArticles[middle],
      allArticles[allArticles.length - 1],
    ];
    for (let newFile of threeArticles) {
      let translatedContent = newFile.text;
      let translatedTitle = newFile.title;
      // Translate content and title if the language is not English
      if (country.language_code !== "en") {
        translatedContent = await translateText(newFile.text, "en");
        translatedTitle = await translateText(newFile.title, "en");
      }

      const addedCaseFile = await addCaseFile({
        countries_id: country.id,
        article_id: newFile.id,
        article_content: translatedContent,
        article_title: translatedTitle,
        publish_date: newFile.publish_date,
        photo_url: newFile.image,
      });
      addedArticles.push({
        articleContent: addedCaseFile.article_content,
        articleId: addedCaseFile.article_id,
      });
    }
    await delay(1000);
  }
  return addedArticles;
}
module.exports = addArticles;
