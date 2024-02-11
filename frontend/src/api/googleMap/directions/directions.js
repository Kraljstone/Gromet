import { computeTotalDistance } from './computeTotalDistance';
export const directionsRenderers = [];
const infoWindows = [];
export const directions = (
  map,
  markerPositions,
  pinNumbersToConnect,
  color
) => {
  if (!Array.isArray(markerPositions) || markerPositions.length === 0) {
    console.error('markerPositions should be a non-empty array.');
    return;
  }
  if (!Array.isArray(pinNumbersToConnect) || pinNumbersToConnect.length === 0) {
    console.error('pinNumbersToConnect should be a non-empty array.');
    return;
  }
  const directionsService = new google.maps.DirectionsService();

  const createDirectionsRenderer = (map, color) =>
    new google.maps.DirectionsRenderer({
      map,
      polylineOptions: { strokeColor: color, strokeWeight: 5 },
      suppressMarkers: true,
    });

  const directionsRenderer = createDirectionsRenderer(map, color);

  directionsRenderers.push(directionsRenderer);

  let origin;
  let destination;
  console.log("pinNumbersToConnect", pinNumbersToConnect)
  const waypoints = pinNumbersToConnect.map((pinNumber, index) => {
    // console.log("markerPositions", markerPositions);
    // const position = markerPositions[pinNumber];
    const storedData = JSON.parse(localStorage.getItem('mapLocations'));
    const dtoIndex = storedData.findIndex(dto => dto["RB naloga"] === String(pinNumber))
    // console.log("index and storedData", dtoIndex, storedData, markerPositions);
    const position = markerPositions[dtoIndex];
    
    if(index === 0){
      origin = markerPositions[dtoIndex];
    }
    if(index === pinNumbersToConnect.length - 1){
      destination = markerPositions[dtoIndex];
    }


    return {
      location: new google.maps.LatLng(position.lat, position.lng),
      stopover: true,
    };
  });

  return new Promise((resolve, reject) => {
    directionsService.route(
      {
        origin: origin,
        destination: destination,
        waypoints,
        travelMode: 'DRIVING',
      },
      (response, status) => {
        if (status === 'OK') {
          const distance = computeTotalDistance(response);
          const renderDirections = (directionsRenderer, response) => {
            directionsRenderer.setDirections(response);
          };
          renderDirections(directionsRenderer, response);
          resolve({ distance, response });
        } else {
          window.alert(`Directions request failed due to ${status}`);
          reject(new Error(`Directions request failed: ${status}`));
        }
      }
    );
  });
};

export const clearDirections = () => {
  directionsRenderers.forEach((renderer) => {
    renderer.setMap(null);
  });

  directionsRenderers.length = 0;

  infoWindows.forEach((info) => {
    info.infoWindow.close();
  });
  infoWindows.length = 0;
};
