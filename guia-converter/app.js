let Reader = require("./Reader");
let Processor = require("./Processor");

let reader = new Reader();

async function main() {
    let data = await reader.Read("./users.csv");

    let processedData = Processor.Process(data);
}

main();
