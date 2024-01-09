const XLSX = require('xlsx');

function readFile(filePath) {

    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });

    return data;
}

module.exports = readFile;