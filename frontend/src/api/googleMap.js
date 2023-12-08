export async function initMap() {
  const mapLocation = await fetch('http://localhost:3000/api/mapLocation');
  const mapLocationData = await mapLocation.json();

  // Check if there is at least one item in the array
  if (mapLocationData.length > 0) {
    // The map, centered at the coordinates of the first item
    //@ts-ignore
    const { Map } = await google.maps.importLibrary('maps');
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');
    const defaultLocation = mapLocationData[0];
    const defaultPosition = await getCoordinates(defaultLocation.ULICA);
    let map = new Map(document.getElementById('map'), {
      zoom: 8,
      center: defaultPosition,
      mapId: '3eecad6d62fb1776',
    });
    console.log(map);
    for (const data of mapLocationData) {
      const position = await getCoordinates(data.ULICA);

      // The marker, positioned at the warehouse
      const marker = new AdvancedMarkerElement({
        map,
        position,
        title: data.ULICA,
      });
      // Create an InfoWindow for each marker
      const infoWindow = new google.maps.InfoWindow({
        content: getInfoWindowContent(data),
      });

      // Add event listeners for mouseover and mouseout to show/hide the InfoWindow
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      map.addListener('click', () => {
        infoWindow.close();
      });
    }
  } else {
    // Handle the case where there is no data in the array
    console.error('No data available.');
  }
}

function getInfoWindowContent(data) {
  console.log(data);
  // Customize the content of the InfoWindow here
  return `
    <div>
      <strong>BR ISTOVARA: ${data['REDNI BROJ ISTOVARA']}</strong><br>
      ${data['NAZIV FIRME']}<br>
      ${data['RADNO VREME']}
    </div>
  `;
}

async function getCoordinates(address) {
  const geolocationAddress = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyB_KDr0ZdH987NeVjzWvYAexCDTqkaWB6M`
  );
  const geolocation = await geolocationAddress.json();
  const { lat, lng } = geolocation.results[0].geometry.location;
  return { lat, lng };
}
