let Reader = require("./Reader");
let Processor = require("./Processor");
let Table = require("./Table");

let reader = new Reader();

async function main() {
    let data = await reader.Read("./users.csv");
    let processedData = Processor.Process(data);

    let users = new Table(processedData);
}

main();
