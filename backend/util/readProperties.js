function readProperties(data) {
    const location_properties = [];
    data.forEach((column, index) => {
      const prop = column[0];
      if (prop) {
        console.log('provera prop', prop);
        location_properties.push(prop);
        column.shift();
      }
    });

    return location_properties;
}

module.exports = readProperties;