let express = require("express");
let app = express();
let session = require("express-session");
let flash = require("express-flash");
let bodyParser = require("body-parser");

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

app.use(flash());

app.get("/", (req, res) => {
    res.render("index");
});

app.post("/form", (req, res) => {
    let { email, name, points } = req.body;

    let emailError;
    let nameError;
    let poinstError;
 
    if (email == undefined || email == "") emailError = "The email is required";
    if (name == undefined || name == "") nameError = "The name is required";
    if (points == undefined || points < 10 ) poinstError = "Points cannot be less than 10";

    if (emailError || nameError || poinstError) return res.redirect("/");
});

app.listen(1313, (req, res) => {
    console.log("Servidor On");
});