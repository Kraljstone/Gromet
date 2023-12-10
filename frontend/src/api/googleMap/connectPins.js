export function connectPins(
  map,
  markerPositions,
  pinNumbersToConnect,
  color
) {
  // Check if markerPositions is an array and not empty
  if (Array.isArray(markerPositions) && markerPositions.length > 0) {
    // Check if pinNumbersToConnect is an array and not empty
    if (Array.isArray(pinNumbersToConnect) && pinNumbersToConnect.length > 0) {
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer({
        map,
        polylineOptions: { strokeColor: color, strokeWeight: 5 },
      });

      const waypoints = pinNumbersToConnect.map((pinNumber) => ({
        location: markerPositions[pinNumber - 1],
        stopover: true,
      }));

      directionsService.route(
        {
          origin: markerPositions[pinNumbersToConnect[0]], // Use the LatLng directly
          destination: markerPositions[pinNumbersToConnect[pinNumbersToConnect.length - 1]],
          waypoints: waypoints.slice(1, -1),
          travelMode: 'DRIVING',
        },
        (response, status) => {
          if (status === 'OK') {
            const distance = computeTotalDistance(response);
            directionsRenderer.setDirections(response);
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


// Helper function to compute total distance
function computeTotalDistance(directionsResult) {
  let totalDistance = 0;
  const legs = directionsResult.routes[0].legs;
  for (let i = 0; i < legs.length; i++) {
    totalDistance += legs[i].distance.value;
  }
  return totalDistance / 1000; // Convert meters to kilometers
}
