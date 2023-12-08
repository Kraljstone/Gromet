const fs = require('fs');
const path = require('path');

const mapLocationController = (req, res) => {
  const filePath = path.join(__dirname, '../../mapLocations.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Parse the JSON data
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      res.status(500).send('Internal Server Error');
    }
  });
};

module.exports = mapLocationController;
