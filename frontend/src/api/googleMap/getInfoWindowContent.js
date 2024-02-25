export const getInfoWindowContent = (mapLocationDataItem, pinAddress) => {
  // Filter data based on matching address
  const matchingData = [mapLocationDataItem]
  // mapLocationData.filter((data) => {
  //   const dataAddress = `${data.Adresa},${data.Mesto}`;
  //   return pinAddress === dataAddress;
  // });

  //Check if Invoice is from 2 weeks ago
  const isMoreThanTwoWeeksAgo = (dateString) => {
    const parts = dateString.split('/');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = 2000 + parseInt(parts[2], 10);

    const inputDate = new Date(year, month, day);
    const currentDate = new Date();

    const timeDifference = currentDate - inputDate;

    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

    return daysDifference > 14;
  };

  const content = matchingData
    .map(
      (data, index) => `
    <div class="infoWindow" key=${index}>
    <div class=${
      isMoreThanTwoWeeksAgo(data['Datum_naloga']) && 'dateBackground'
    }><strong>Datum:</strong> ${data['Datum_naloga']}</div>
    <strong>RB naloga:</strong> ${data['RB naloga']}<br>
      <strong>Naziv kupca:</strong> ${data['Naziv kupca']}<br>
      <strong>Vrednost naloga:</strong> ${data['Vrednost naloga']} rsd <br>
      <strong>Težina:</strong> ${data['Težina_kg']} kg<br>
      <strong>Gabarit:</strong> ${data['Gabarit_m3']}<br>
      <strong>Radno Vreme:</strong> ${data['Radno_vreme']}<br>
      <strong>Prioritet:</strong> ${data['Prioritet']}<br>
      ${
        data['Gabarit_upozorenja'] !== '/'
          ? '<span class="overweight"><i class="fas fa-solid fa-weight-hanging"></i></span>'
          : ''
      }<br>
    </div>
  `
    )
    .join('');

  const containerStyle =
    matchingData.length > 1 ? 'max-height: 135px; overflow-y: auto;' : '';

  return `<div style="${containerStyle}">${content}</div>`;
};
