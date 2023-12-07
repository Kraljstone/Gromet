const XLSX = require('xlsx');
const fs = require('fs');

const uploadController = (req, res) => {
  const uploadedFile = req.file;
  const filePath = uploadedFile.path;

  const processExcelFile = (filePath) => {
    const workbook = XLSX.readFile(filePath);
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: false });

    const location_properties = [];
    data.forEach((column, index) => {
      const prop = column[0];
      if (prop) {
        console.log('provera prop', prop);
        location_properties.push(prop);
        column.shift();
      }
    });
    // Create an array to hold the product objects
    const mapLocations = [];

    const NUM_OF_PRODUCTS = data[0].length;
    console.log(
      'props:',
      location_properties,
      '\nNUM_OF_PRODUCTS:',
      NUM_OF_PRODUCTS
    );

    for (let i = 0; i < NUM_OF_PRODUCTS; i++) {
      const product = {};
      data.forEach((column, colIndex) => {
        if (location_properties[colIndex]) {
          product[location_properties[colIndex]] = column[i] ? column[i] : '/';
        }
      });
      mapLocations.push(product);
    }

    console.log('mapLocations:', mapLocations.length);
    fs.writeFileSync('mapLocations.json', JSON.stringify(mapLocations));
  };
  // Execute your map script with the file path
  processExcelFile(filePath);

  res.json({ success: true });
};

module.exports = uploadController;
