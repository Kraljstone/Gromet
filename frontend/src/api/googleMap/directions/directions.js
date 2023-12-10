let directionsRenderer;

export function directions(
  map,
  markerPositions,
  pinNumbersToConnect,
  color,
  thickness = 5
) {
  // Check if markerPositions is an array and not empty
  if (Array.isArray(markerPositions) && markerPositions.length > 0) {
    // Check if pinNumbersToConnect is an array and not empty
    if (Array.isArray(pinNumbersToConnect) && pinNumbersToConnect.length > 0) {
      // If directionsRenderer is already defined, clear the existing directions
      if (directionsRenderer) {
        directionsRenderer.setMap(null);
      }

      const directionsService = new google.maps.DirectionsService();
      directionsRenderer = new google.maps.DirectionsRenderer({
        map,
        polylineOptions: { strokeColor: color, strokeWeight: thickness },
      });

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


export function clearDirections() {
  if (directionsRenderer) {
    directionsRenderer.setMap(null);
  }
}
