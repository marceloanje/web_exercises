const express = require("express");
const router = express.Router();

router.get("/articles", (req, res) => {
    res.send("Router articles");
});

router.get("/admin/articles/new", (req, res) => {
    res.send("Router for create a new article");
});

module.exports = router;
