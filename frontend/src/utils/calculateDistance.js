export const calculateDistance = (
  directionsResult,
  pinNumbersToConnect,
  highwayCost,
  mapLocationData
) => {
  const legs = directionsResult.routes[0].legs;
  const durationsAndDistances = [];

  for (let i = 0; i < pinNumbersToConnect.length - 1; i++) {
    const pinA = pinNumbersToConnect[i];
    const pinB = pinNumbersToConnect[i + 1];
    const leg = legs[i];

    const storedVehicles = JSON.parse(localStorage.getItem('vehiclesData'));
    const routesData = JSON.parse(localStorage.getItem('routesData'));

    const routeVehicle = storedVehicles.find((storedVehicle) => {
      return routesData?.some((routeInfo) => {
        return (
          routeInfo?.routeName !== '' &&
          storedVehicle?.vehicle?.includes(routeInfo?.selectedField)
        );
      });
    });

    const vehicleCost = +routeVehicle?.cost;
    const routeCost = vehicleCost * (leg.distance.value / 1000) + +highwayCost;

    const locationMapping = `${pinA},${pinB}`;
    const startingPin = locationMapping.split(',').slice(0, -1).map(Number);
    const locationInvoice = mapLocationData.filter((data) => {
      const pinValues = startingPin.map((pinValue) => +pinValue + 1);
      return pinValues.includes(+data['RB naloga']);
    });

    const routeInvoiceSum = locationInvoice.reduce((total, invoiceValue) => {
      return total + +invoiceValue['Vrednost naloga'];
    }, 0);

    const profitabilityPercentage = Math.trunc(
      (routeInvoiceSum / (routeCost / 0.02)) * 100
    );

    const valueToProfitability = Math.trunc(
      routeInvoiceSum - (routeCost / 0.02)
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
