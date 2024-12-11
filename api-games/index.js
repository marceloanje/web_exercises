const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let DB = {
    games: [
        {
            id: 10,
            title: "Sim City 4",
            year: 2004,
            price: 20,
        },
        {
            id: 35,
            title: "Cities Skylines",
            year: 2016,
            price: 40,
        },
        {
            id: 98,
            title: "GTA V",
            year: 2013,
            price: 60,
        },
        {
            id: 76,
            title: "The Witcher",
            year: 2007,
            price: 40,
        },
        {
            id: 23,
            title: "Red Dead Revolver",
            year: 2004,
            price: 40,
        },
    ],
};

app.get("/games", (req, res) => {
    res.statusCode = 200;
    res.json(DB.games);
});

app.listen(2000, () => {
    console.log("API TEST...");
});
