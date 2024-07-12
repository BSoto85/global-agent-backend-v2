require('dotenv').config();

// using google cloud
const { Translate } = require('@google-cloud/translate').v2;
const translate = new Translate();

async function translateText(text, targetLanguage) {
  
    try {
      const [translation] = await translate.translate(text, targetLanguage);
    //   console.log(`Translation: ${text} => (${targetLanguage}) ${translation}`);
      return translation;
    } catch (error) {
      console.error('Error translating text:', error);
      throw error;
    }
}

module.exports = translateText