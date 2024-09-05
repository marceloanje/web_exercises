const express = require("express");
const router = express.Router();

router.get("/categories", (req, res) => {
    res.send("Router categories");
});

router.get("/admin/categories/new", (req, res) => {
    res.send("Router for create a new categorie");
});

module.exports = router;
