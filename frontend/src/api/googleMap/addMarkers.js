import { getCoordinates } from './getCoordinates.js';
import { applyDirections } from './directions/applyDirections.js';
import { getInfoWindowContent } from './getInfoWindowContent.js';

export const addMarkers = async (mapLocationData, map) => {
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

  const markerPositions = [];
  for (let i = 0; i < mapLocationData.length; i++) {
    const address = `${mapLocationData[i].Adresa},${mapLocationData[i].Mesto}`;
    const position = await getCoordinates(address);


    // hasNearbyNeighbourClient(position, maplocationData);
    // { check if x2 - x1 lat and y2 - y1 lang are closer than 2000m then return true and those two should have another colour}
    // distance between 2 points

    // ako ima jos neki s tom adresom onda offsetaj position za neki lat/lang
    const hasMultipleInvoices = mapLocationData.map(loc => loc.Adresa).filter(adr => String(mapLocationData[i].Adresa).includes(adr)).length > 1;
    if(hasMultipleInvoices){
      const firstOccuranceIndex = mapLocationData.findIndex(el => el.Adresa === mapLocationData[i].Adresa);
      if(firstOccuranceIndex !== i){
        const randomIndexBasedNegation = i % 2 === 0 
        const latOffest = 0.00005 + (i/1000000);
        if(randomIndexBasedNegation){
          position.lat += randomIndexBasedNegation ? -latOffest : +latOffest;
        }else{
          position.lng += randomIndexBasedNegation ? -latOffest : +latOffest;
        }
      }
    }
    const redniBroj = mapLocationData[i]["RB naloga"];

    const pinGlyph = new google.maps.marker.PinElement({
      glyph: redniBroj,
      glyphColor: 'white',
      background:  hasMultipleInvoices ? 'purple' : 'red'
    });

    // The marker, positioned at the warehouse
    const marker = new AdvancedMarkerElement({
      map,
      position,
      content: pinGlyph.element,
    });
    // Create an InfoWindow for each marker
    const infoWindow = new google.maps.InfoWindow({
      content: getInfoWindowContent(mapLocationData[i], address),
    });
    // Add event listeners for mouseover and mouseout to show/hide the InfoWindow

    // infoWindow.open(map, marker);
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
