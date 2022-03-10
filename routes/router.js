const express = require("express");
const router = express.Router();
const { formatResults } = require("../controllers/formatResults");
const { returnsResults } = require("../controllers/returnsResults");

router.post("/search", async function (req, res) {
  try {
    const search = req.body;
    const { cityName } = search;
    if (cityName) {
      const website = "https://www.vivareal.com.br";
      const listResults = await returnsResults(website, search, res, 2, 50);
      const results = formatResults(website, listResults);
      res.send({ search, results });
    } else {
      res.status(400).send({
        error: "Missing parameters",
        msg: "cityName is required",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({
      error: "Internal server error",
      msg: err,
    });
  }
});

module.exports = router;
