export function getInfoWindowContent(mapLocationData, pinAddress) {
  // Filter data based on matching address
  const matchingData = mapLocationData.filter((data) => {
    const dataAddress = `${data.ULICA},${data.GRAD}`;
    return pinAddress === dataAddress;
  });

  const content = matchingData
    .map(
      (data, index) => `
    <div key=${index}>
      <strong>Broj Paketa:</strong> ${data['BROJ PAKETA']}<br>
      <strong>Grad:</strong> ${data['GRAD']}<br>
      <strong>Naziv Firme:</strong> ${data['NAZIV FIRME']}<br>
      <strong>Potpis:</strong> ${data['POTPIS']}<br>
      <strong>Radno Vreme:</strong> ${data['RADNO VREME']}<br>
      <strong>Redni Br istovara:</strong> ${data['REDNI BROJ ISTOVARA']}<br>
      <strong>Kontakt:</strong> ${data['TELEFON']}<br>
      <strong>Ulica:</strong> ${data['ULICA']}<br><br>
    </div>
  `
    )
    .join('');

  const containerStyle = matchingData.length > 1 ? 'max-height: 135px; overflow-y: auto;' : '';

  return `<div style="${containerStyle}">${content}</div>`;
}
