const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  console.log("signup");
  res.render("index");
});

router.get("/login", (req, res) => {
  console.log("login");
  res.render("login");
});

router.get("/members", (req, res) => {
  console.log("members");
  res.render("members");
});

module.exports = router;
