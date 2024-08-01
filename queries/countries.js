const db = require("../db/dbConfig");

// INDEX- get all countries from countries table
const getAllCountries = async () => {
  try {
    const allCountries = await db.any(`SELECT * FROM countries`);
    return allCountries;
  } catch (error) {
    return error;
  }
};

module.exports = {
  getAllCountries,
};
