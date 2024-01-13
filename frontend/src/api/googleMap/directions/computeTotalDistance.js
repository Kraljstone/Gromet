export const computeTotalDistance = (directionsResult) => {
  let totalDistance = 0;
  const legs = directionsResult.routes[0].legs;

  for (let i = 0; i < legs.length; i++) {
    totalDistance += legs[i].distance.value;
  }
  return totalDistance / 1000;
};
