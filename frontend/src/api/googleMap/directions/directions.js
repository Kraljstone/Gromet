import { computeTotalDistance } from './computeTotalDistance';
import data from '../../../../../mapLocations.json';
const directionsRenderers = [];
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
          const distanceBetweenPins = calculateDistance(
            response,
            pinNumbersToConnect
          );
          const renderDirections = (directionsRenderer, response) => {
            directionsRenderer.setDirections(response);
          };
          renderDirections(directionsRenderer, response);
          showInfoWindow(map, response, distanceBetweenPins);
          resolve(distance);
        } else {
          window.alert(`Directions request failed due to ${status}`);
          reject(new Error(`Directions request failed: ${status}`));
        }
      }
    );
  });
};

const showInfoWindow = (map, response, distances) => {
  let combinedContent = '';

  for (const distanceObj of distances) {
    const {
      pins,
      valueToProfitability,
      profitabilityPercentage,
      duration,
      distance,
    } = distanceObj;

    combinedContent += `
      Pins: ${pins}<br>
      Value to Profitability: ${valueToProfitability}<br>
      Profitability Percentage: ${profitabilityPercentage}%<br>
      Duration: ${duration}<br>
      Total Distance: ${distance}<br><br>
    `;
  }

  const midpointIndex = Math.floor(
    response.routes[0].legs[0].steps.length / 2
  );
  const midpointLocation =
    response.routes[0].legs[0].steps[midpointIndex].end_location;

  const infoWindow = new google.maps.InfoWindow();
  infoWindow.setContent(`<div style="max-height: 90px; overflow-y: auto;">${combinedContent}</div>`);
  infoWindow.setPosition(midpointLocation);
  infoWindow.open(map);

  // Clear previous infoWindows and add the new one
  infoWindows.forEach((info) => info.infoWindow.close());
  infoWindows.length = 0;
  infoWindows.push({ distance: 'combined', infoWindow });
};



const calculateDistance = (directionsResult, pinNumbersToConnect) => {
  const legs = directionsResult.routes[0].legs;
  const durationsAndDistances = [];

  for (let i = 0; i < pinNumbersToConnect.length - 1; i++) {
    const pinA = pinNumbersToConnect[i];
    const pinB = pinNumbersToConnect[i + 1];
    const leg = legs[i];

    const storedVehicles = JSON.parse(localStorage.getItem('vehiclesData'));
    const routesData = JSON.parse(localStorage.getItem('routesData')) || [];

    const routeVehicle = storedVehicles.find((storedVehicle) => {
      return routesData?.some((routeInfo) => {
        return (
          routeInfo.routeName !== '' &&
          storedVehicle?.vehicle?.includes(routeInfo.selectedField)
        );
      });
    });

    const vehicleCost = +routeVehicle?.cost;
    const routeCost =
      vehicleCost + (leg.distance.value / 1000) * +routeVehicle?.highwayCost;

    const mapLocationData = data;
    const locationMapping = `${pinA},${pinB}`;
    const startingPin = locationMapping.split(',').slice(0, -1).map(Number);
    const locationInvoice = mapLocationData.filter((data) => {
      const pinValues = startingPin.map((pinValue) => +pinValue + 1);
      return pinValues.includes(+data['RB naloga']);
    });

    const invoiceValueSum = () => {
      let totalValue = 0;
      locationInvoice.forEach((invoiceValue) => {
        totalValue += +invoiceValue['Vrednost naloga'];
      });
      return totalValue;
    };

    const routeInvoiceSum = invoiceValueSum();

    const profitabilityPercentage = Math.round(
      (routeInvoiceSum / (routeCost / 0.02)) * 100
    );

    const valueToProfitability = Math.round(
      routeInvoiceSum - routeCost / 0.02
    ).toLocaleString('en-GB');
    const legData = {
      pins: `${pinA},${pinB}`,
      valueToProfitability,
      profitabilityPercentage,
      duration: leg.duration.text,
      distance: leg.distance.text,
    };

    durationsAndDistances.push(legData);
  }

  return durationsAndDistances;
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
