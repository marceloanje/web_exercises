let Reader = require("./Reader");
let Processor = require("./Processor");
let Table = require("./Table");
let HtmlParser = require("./HtmlParser");

let reader = new Reader();

async function main() {
    let data = await reader.Read("./users.csv");
    let processedData = Processor.Process(data);

    let users = new Table(processedData);

    let html = await HtmlParser.Parse(users);

    console.log(html);
}

main();
