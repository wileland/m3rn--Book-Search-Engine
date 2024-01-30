const express = require("express");
const router = require("express").Router();
const path = require("path");

// In production, serve the React front-end
if (process.env.NODE_ENV === "production") {
  router.use(express.static(path.join(__dirname, "../client/build")));
  router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });
}

module.exports = router;
