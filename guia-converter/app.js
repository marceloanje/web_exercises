let Reader = require("./Reader");

let reader = new Reader();

async function main() {
    let dados = await reader.Read("./users.csv");
    console.log(dados);
}

main();
