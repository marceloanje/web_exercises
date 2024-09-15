const express = require("express");
const router = express.Router();
const Category = require("../categories/Category");
const Article = require("./Article");
const slugify = require("slugify");

router.get("/admin/articles", (req, res) => {
    Article.findAll({
        include: [{ model: Category }],
    }).then((articles) => {
        res.render("admin/articles/index", { articles: articles });
    });
});

router.get("/admin/articles/new", (req, res) => {
    Category.findAll().then((categories) => {
        res.render("admin/articles/new", { categories: categories });
    });
});

router.post("/articles/save", (req, res) => {
    let title = req.body.title;
    let body = req.body.body;
    let categoryId = req.body.category;

    if (title == undefined) res.redirect("/admin/articles");
    if (body == undefined) res.redirect("/admin/articles");

    Article.create({
        title: title,
        slug: slugify(title),
        body: body,
        categoryId: categoryId,
    }).then(() => {
        res.redirect("/admin/articles");
    });
});

router.post("/articles/delete", (req, res) => {
    let id = req.body.id;

    if (id != undefined) {
        if (!isNaN(id)) {
            Article.destroy({
                where: {
                    id: id,
                },
            }).then(() => {
                res.redirect("/admin/articles");
            });
        } else {
            res.redirect("/admin/articles");
        }
    } else {
        res.redirect("/admin/articles");
    }
});

router.get("/admin/articles/edit/:id", (req, res) => {
    let id = req.params.id;

    if (isNaN(id)) res.redirect("/admin/categories");

    Article.findByPk(id)
        .then((article) => {
            if (article != undefined) {
                res.render("admin/articles/edit", { article: article });
            } else {
                res.redirect("/admin/articles");
            }
        })
        .catch((err) => {
            res.redirect("/admin/articles");
        });
});

router.post("/articles/update", (req, res) => {
    let id = req.body.id;
    let title = req.body.title;
    let body = req.body.body;

    Article.update(
        {
            title: title,
            slug: slugify(title),
            body: body,
        },
        {
            where: {
                id: id,
            },
        }
    ).then(() => {
        res.redirect("/admin/articles");
    });
});

router.get("/articles/page/:num", (req, res) => {
    let page = parseInt(req.params.num);
    let limit = 4;
    let offset = (page - 1) * limit;

    Article.findAndCountAll({
        limit: limit,
        offset: offset,
        order: [["id", "DESC"]],
    })
        .then((articles) => {
            let next = offset + limit < articles.count;

            let response = {
                page: parseInt(page),
                next: next,
                articles: articles,
            };

            Category.findAll().then((categories) => {
                res.render("admin/articles/page", {
                    result: response,
                    categories: categories,
                });
            });
        })
        .catch((err) => {
            res.redirect("/admin/articles");
        });
});

module.exports = router;
