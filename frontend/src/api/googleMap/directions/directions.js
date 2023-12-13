let directionsRenderers = [];
let infoWindows = [];

export function directions(map, markerPositions, pinNumbersToConnect, color) {
  // Check if markerPositions is an array and not empty
  if (Array.isArray(markerPositions) && markerPositions.length > 0) {
    // Check if pinNumbersToConnect is an array and not empty
    if (Array.isArray(pinNumbersToConnect) && pinNumbersToConnect.length > 0) {
      const directionsService = new google.maps.DirectionsService();

      const directionsRenderer = new google.maps.DirectionsRenderer({
        map,
        polylineOptions: { strokeColor: color, strokeWeight: 5 },
        suppressMarkers: true,
      });

      directionsRenderers.push(directionsRenderer);

      const waypoints = pinNumbersToConnect.map((pinNumber) => ({
        location: markerPositions[pinNumber - 1],
        stopover: true,
      }));
      directionsService.route(
        {
          origin: markerPositions[pinNumbersToConnect[0]],
          destination:
            markerPositions[
              pinNumbersToConnect[pinNumbersToConnect.length - 1]
            ],
          waypoints: waypoints.slice(1, -1),
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            const distance = computeTotalDistance(response);
            directionsRenderer.setDirections(response);

            // Show info window with total distance at the midpoint
            const infoWindow = new google.maps.InfoWindow();
            const midpointIndex = Math.floor(
              response.routes[0].legs[0].steps.length / 2
            );
            const midpointLocation =
              response.routes[0].legs[0].steps[midpointIndex].end_location;

            const content = `Total Distance: ${distance.toFixed(2)} km`;
            infoWindow.setContent(content);
            infoWindow.setPosition(midpointLocation);
            infoWindow.open(map);

            infoWindows.push(infoWindow);
          } else {
            window.alert('Directions request failed due to ' + status);
          }
        }
      );
    } else {
      console.error('pinNumbersToConnect should be a non-empty array.');
    }
  } else {
    console.error('markerPositions should be a non-empty array.');
  }
}

function computeTotalDistance(directionsResult) {
  let totalDistance = 0;
  const legs = directionsResult.routes[0].legs;
  for (let i = 0; i < legs.length; i++) {
    totalDistance += legs[i].distance.value;
  }
  return totalDistance / 1000 + totalDistance / 2000;
}

export function clearDirections() {
  directionsRenderers.forEach((renderer) => {
    renderer.setMap(null);
  });
  directionsRenderers = [];

  infoWindows.forEach((infoWindow) => {
    infoWindow.close();
  });
  infoWindows = [];
}
