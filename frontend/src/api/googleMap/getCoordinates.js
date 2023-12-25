import { apiKey } from '../../../../config.json';

// Get the coordinates of the address

export const getCoordinates = async (address) => {
  const geolocationAddress = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
  );

  const geolocation = await geolocationAddress.json();
  const { lat, lng } = geolocation.results[0].geometry.location;
  return { lat, lng };
};
