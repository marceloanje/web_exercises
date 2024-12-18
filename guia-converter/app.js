let Reader = require("./Reader");
let Writer = require("./Writer");
let Processor = require("./Processor");
let Table = require("./Table");
let HtmlParser = require("./HtmlParser");
let PdfWriter = require("./PdfWriter");

let reader = new Reader();
let writer = new Writer();

async function main() {
    let data = await reader.Read("./users.csv");
    let processedData = Processor.Process(data);

    let users = new Table(processedData);

    let html = await HtmlParser.Parse(users);

    writer.Write("arquivoHtml.html", html);
    PdfWriter.WritePdf("arquivoPdf.PDF", html);
}

main();
