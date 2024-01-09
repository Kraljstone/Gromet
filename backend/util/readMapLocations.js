function readMapLocations (data, location_properties, num_of_items){
    const mapLocations = [];
    for (let i = 0; i < num_of_items; i++) {
      const locationData = {};
      data.forEach((column, colIndex) => {
        if (location_properties[colIndex]) {
          locationData[location_properties[colIndex]] = column[i] ? column[i] : '/';
        }
      });
      mapLocations.push(locationData);
    }

    return mapLocations;
}


module.exports = readMapLocations;