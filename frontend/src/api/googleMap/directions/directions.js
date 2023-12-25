import { computeTotalDistance } from './computeTotalDistance';
const directionsRenderers = [];
const infoWindows = [];

export const directions = (map, markerPositions, pinNumbersToConnect, color) => {
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

  const waypoints = pinNumbersToConnect.slice(1, -1).map((pinNumber) => {
    const position = markerPositions[pinNumber];

    return {
      location: new google.maps.LatLng(position.lat, position.lng),
      stopover: true,
    };
  });
  
  return new Promise((resolve, reject) => {
    directionsService.route(
      {
        origin: markerPositions[pinNumbersToConnect[0]],
        destination:
          markerPositions[pinNumbersToConnect[pinNumbersToConnect.length - 1]],
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

          showInfoWindow(map, response, distance);
          resolve(distance);
        } else {
          window.alert(`Directions request failed due to ${status}`);
          reject(new Error(`Directions request failed: ${status}`));
        }
      }
    );
  });
}

const showInfoWindow = (map, response, distance) => {
  const infoWindow = new google.maps.InfoWindow();
  const midpointIndex = Math.floor(response.routes[0].legs[0].steps.length / 2);
  const midpointLocation =
    response.routes[0].legs[0].steps[midpointIndex].end_location;
  const content = `Total Distance: ${distance.toFixed(2)} km`;

  infoWindow.setContent(content);
  infoWindow.setPosition(midpointLocation);
  infoWindow.open(map);

  infoWindows.push(infoWindow);
};

export const clearDirections = () => {
  directionsRenderers.forEach((renderer) => {
    renderer.setMap(null);
  });
  directionsRenderers.length = 0;

  infoWindows.forEach((infoWindow) => {
    infoWindow.close();
  });
  infoWindows.length = 0;
}
