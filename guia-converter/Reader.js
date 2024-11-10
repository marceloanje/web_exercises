const fs = require("fs");

class Reader {
    Read(filepath) {
        fs.readFile(filepath, "utf-8", (err, data) => {
            if (err) throw err;
            console.log(data);
        });
    }
}

module.exports = Reader;
