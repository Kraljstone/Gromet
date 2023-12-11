import { getInfoWindowContent } from './getInfoWindowContent';
import { directions } from './directions/directions';
import { applyDirections } from './directions/applyDirections';

export async function initMap() {
  const mapLocation = await fetch('http://localhost:3000/api/mapLocation');
  const mapLocationData = await mapLocation.json();

  async function getCoordinates(address) {
    const geolocationAddress = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyB_KDr0ZdH987NeVjzWvYAexCDTqkaWB6M`
    );
    const geolocation = await geolocationAddress.json();
    const { lat, lng } = geolocation.results[0].geometry.location;
    return { lat, lng };
  }

  // Check if there is at least one item in the array

  if (mapLocationData.length > 0) {
    // The map, centered at the coordinates of the first item

    const { Map } = await google.maps.importLibrary('maps');
    const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

    const defaultLocation = mapLocationData[0];
    const defaultAddress = await getCoordinates(
      `${defaultLocation.ULICA},${defaultLocation.GRAD}`
    );

    let map = new Map(document.getElementById('map'), {
      zoom: 8,
      center: defaultAddress,
      mapId: '3eecad6d62fb1776',
    });

    const markerPositions = [];

    for (let i = 0; i < mapLocationData.length; i++) {
      const address = `${mapLocationData[i].ULICA},${mapLocationData[i].GRAD}`;
      const position = await getCoordinates(address);

      // Create an array of alphabetical characters used to label the markers.
      const labels = i.toString();
      const label = labels[i % labels.length];
      const pinGlyph = new google.maps.marker.PinElement({
        glyph: label,
        glyphColor: 'white',
      });

      // The marker, positioned at the warehouse
      const marker = new AdvancedMarkerElement({
        map,
        position,
        content: pinGlyph.element,
      });

      // Create an InfoWindow for each marker
      const infoWindow = new google.maps.InfoWindow({
        content: getInfoWindowContent(mapLocationData[i]),
      });
      // Add event listeners for mouseover and mouseout to show/hide the InfoWindow
      infoWindow.open(map, marker);

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });

      map.addListener('click', () => {
        infoWindow.close();
      });

      markerPositions.push(position);
    }
    const storedData = JSON.parse(localStorage.getItem('routesData'));

    storedData?.forEach((data) => {
      let pinNumbersToConnect = [];
      if (data.invoiceNumberBody) {
        pinNumbersToConnect = data.invoiceNumberBody.split(',').map(Number);
      }
      if (pinNumbersToConnect.length > 0) {
        directions(map, markerPositions, pinNumbersToConnect, data.randomColor);
      }
    });

    applyDirections(map, markerPositions);
  } else {
    // Handle the case where there is no data in the array
    console.error('No data available.');
  }
}
