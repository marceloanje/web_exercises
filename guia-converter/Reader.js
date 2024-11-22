const fs = require("fs");
const util = require("util");

class Reader {
    constructor() {
        this.reader = util.promisify(fs.readFile);
    }

    async Read(filepath) {
        // fs.readFile(filepath, "utf-8", (err, data) => {
        //     if (err) throw err;
        //     console.log(data);
        // });
        try {
            return await this.reader(filepath, "utf-8");
        } catch (err) {
            return undefined;
        }
    }
}

module.exports = Reader;
