const express = require("express");
const countries = express.Router();

const { getAllCountries } = require("../queries/countries");

//INDEX https://global-agent-jwxj4.ondigitalocean.app/api/countries
countries.get("/", async (req, res) => {
  const allCountries = await getAllCountries();
  if (allCountries[0]) {
    res.status(200).json(allCountries);
  } else {
    res.status(500).json({ error: "Error fetching Countries" });
  }
});

module.exports = countries;
