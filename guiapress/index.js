const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");

app.set("view engine", "ejs");

app.use(
    session({
        secret: "senhaaleatoria",
        cookie: {
            maxAge: 30 * 1000 * 1000,
        },
    })
);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

connection
    .authenticate()
    .then(() => {
        console.log("Connection success!");
    })
    .catch((error) => {
        console.log(error);
    });

app.use("/", categoriesController);
app.use("/", articlesController);
app.use("/", usersController);

app.get("/", (req, res) => {
    Article.findAll({
        order: [["id", "DESC"]],
        limit: 4,
    }).then((articles) => {
        Category.findAll().then((categories) => {
            res.render("index", {
                articles: articles,
                categories: categories,
            });
        });
    });
});

app.get("/:slug", (req, res) => {
    let slug = req.params.slug;

    Article.findOne({
        where: {
            slug: slug,
        },
    })
        .then((article) => {
            if (article != undefined) {
                Category.findAll().then((categories) => {
                    res.render("article", {
                        article: article,
                        categories: categories,
                    });
                });
            } else {
                res.redirect("/");
            }
        })
        .catch((err) => {
            res.redirect("/");
        });
});

app.get("/category/:slug", (req, res) => {
    let slug = req.params.slug;

    Category.findOne({
        where: {
            slug: slug,
        },
        include: [{ model: Article }],
    })
        .then((category) => {
            if (category != undefined) {
                Category.findAll().then((categories) => {
                    res.render("index", {
                        articles: category.articles,
                        categories: categories,
                    });
                });
            } else {
                res.redirect("/");
            }
        })
        .catch((err) => {
            res.redirect("/");
        });
});

app.listen(8080, () => {
    console.log("The server is on!");
});
