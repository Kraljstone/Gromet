
const exceljs = require('exceljs');

const processJsonDataController = async (req, res) => {
    try {

        const jsonData = req.body;
        console.log("request arrived", jsonData);

        if (!Array.isArray(jsonData) || jsonData.length === 0) {
            return res.status(400).json({ success: false, error: 'Invalid JSON data format' });
        }

        const workbook = new exceljs.Workbook();
        const worksheet = workbook.addWorksheet('ListaIstovara');

        // Extract column headers from the first item in the array
        const headers = Object.keys(jsonData[0]);

        // Write headers to the worksheet
        worksheet.addRow(headers);

        // Write data to the worksheet
        jsonData.forEach(item => {
            const row = headers.map(header => item[header]);
            worksheet.addRow(row);
        });

        // Set the content type and headers for the response
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=ListaIstovara.xlsx');

        // Send the Excel file as a response
        return workbook.xlsx.write(res)
            .then(() => {
                res.end();
            })
            .catch(error => {
                console.error('Error generating Excel file:', error);
                res.status(500).json({ success: false, error: 'Internal Server Error' });
            });
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
};

module.exports = processJsonDataController;