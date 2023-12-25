import { getCoordinates } from './getCoordinates.js';
import { applyDirections } from './directions/applyDirections.js';
import { getInfoWindowContent } from './getInfoWindowContent.js';

export const addMarkers = async (mapLocationData, map) => {
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

  const markerPositions = [];

  for (let i = 0; i < mapLocationData.length; i++) {
    const address = `${mapLocationData[i].Adresa},${mapLocationData[i].Mesto}`;
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
      content: getInfoWindowContent(mapLocationData, address),
    });
    // Add event listeners for mouseover and mouseout to show/hide the InfoWindow

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });

    map.addListener('click', () => {
      infoWindow.close();
    });

    markerPositions.push(position);
  }

  applyDirections(map, markerPositions);
};
