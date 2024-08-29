const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/:nome/:lang", (req, res) => {
    let nome = req.params.nome;
    let lang = req.params.lang;
    let exibirMsg = false;
    res.render("index", {
        nome: nome,
        lang: lang,
        msg: exibirMsg,
    });
});

app.listen(8080, () => {
    console.log("App rodando!");
});
