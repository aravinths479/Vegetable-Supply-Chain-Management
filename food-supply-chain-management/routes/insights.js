const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

const Insight = require("../models/Insight");

const getData = () => {
  Insight.find({})
    .then((data) => {
      console.log(data);
      return data;
    })
    .catch((err) => {
      console.log(data);
    });
};

router.get("/insight", ensureAuthenticated, (req, res) => {
  Insight.find({})
    .then((data) => {
      console.log(data);
      return res.render("dailyInsights", { user: req.user, data: data });
    })
    .catch((err) => {
      console.log(data);
    });
});




module.exports = router;
