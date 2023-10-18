// Import necessary modules
const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");
const multer = require("multer");
const path = require("path");


// Import the Insight model
const Insight = require("../models/Insight");

// Handle GET request for insights
router.get("/insight", ensureAuthenticated, (req, res) => {
  Insight.find({})
    .then((data) => {
      console.log(data);
      return res.render("dailyInsights", { user: req.user, data: data });
    })
    .catch((err) => {
      console.log(err);
    });
});


// Set up Multer storage and file naming
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, callback) => {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// Handle POST request to add an insight with an image
router.post("/add-insight", ensureAuthenticated, upload.single("image"), (req, res) => {
  Insight.create({ title:req.body.title,
    content: req.body.content, 
    image: req.file ? path.join('/uploads', req.file.filename) : null })
    .then((data) => {
     
      Insight.find({})
        .then((data) => {
          console.log(data);
          req.flash("success_msg", "Data Added Successfully");
          return res.redirect("/insights/insight")
          //return res.render("dailyInsights", { user: req.user, data: data });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
