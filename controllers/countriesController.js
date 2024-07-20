const express = require("express");
const countries = express.Router();

const { getAllCountries } = require("../queries/countries");

//INDEX http://localhost:3003/api/countries
countries.get("/", async (req, res) => {
  const allCountries = await getAllCountries();
  console.log("All countries in GET", allCountries);
  if (allCountries[0]) {
    res.status(200).json(allCountries);
  } else {
    res.status(500).json({ error: "Error fetching Countries" });
  }
});

module.exports = countries;
