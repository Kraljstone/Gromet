
const fs = require('fs');
const deleteFile  = require('../util/deleteFile');

const readFile  = require('../util/readFile');

const readProperties  = require('../util/readProperties');

const readMapLocations = require('../util/readMapLocations');

const processExcelFileController = async (req, res) => {
  console.log("request arrived");

  const uploadedFile = req.file;
  
  if(!uploadedFile)
    return res.json({ success: false });

  const filePath = uploadedFile.path;

  const fileData = readFile(filePath);

  const location_properties = readProperties(fileData);

  const NUM_OF_PRODUCTS = fileData[0].length;
  console.log('props:', location_properties);
  console.log('NUM_OF_PRODUCTS:', NUM_OF_PRODUCTS);
    
  const mapLocations = readMapLocations(fileData, location_properties, NUM_OF_PRODUCTS);

  console.log('mapLocations:', mapLocations.length);

  fs.writeFileSync('mapLocations.json', JSON.stringify(mapLocations));

  await deleteFile(filePath);

  res.json({ success: true });
};

module.exports = processExcelFileController;
