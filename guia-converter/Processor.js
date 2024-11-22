class Processor {
    static Process(data) {
        let rows = [];

        data.split("\r\n").forEach((row) => {
            let itemRow = row.split(";");
            rows.push(itemRow);
        });

        return rows;
    }
}

module.exports = Processor;
