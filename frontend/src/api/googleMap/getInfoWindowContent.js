export function getInfoWindowContent(data) {
  return `
    <div>
        <strong>Broj Paketa:</strong> ${data['BROJ PAKETA']}<br>
        <strong>Grad:</strong> ${data['GRAD']}<br>
        <strong>Naziv Firme:</strong> ${data['NAZIV FIRME']}<br>
        <strong>Potpis:</strong> ${data['POTPIS']}<br>
        <strong>Radno Vreme:</strong> ${data['RADNO VREME']}<br>
        <strong>Redni Br istovara:</strong> ${data['REDNI BROJ ISTOVARA']}<br>
        <strong>Kontakt:</strong> ${data['TELEFON']}<br>
        <strong>Ulica:</strong> ${data['ULICA']}<br>
    </div>
  `;
}
