import { addMarkers } from './addMarkers';
import data from '../../../../mapLocations.json';
import googleKey from '../../../../config.json';

// Get the coordinates of the address
export const getCoordinates = async (address) => {
  const geolocationAddress = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey.apiKey}`
  );
  const geolocation = await geolocationAddress.json();
  const { lat, lng } = geolocation.results[0].geometry.location;
  return { lat, lng };
};

export const initMap = async () => {
  const mapLocationData = data;
  const defaultLocation = mapLocationData[0];
  if (mapLocationData.length > 0) {
    const defaultAddress = await getCoordinates(
      `${defaultLocation.Adresa},${defaultLocation.Mesto}`
    );

    const initMapLoad = async (addressCoordinates) => {
      const { Map } = await google.maps.importLibrary('maps');

      let map = new Map(document.getElementById('map'), {
        zoom: 10,
        center: addressCoordinates,
        mapId: '3eecad6d62fb1776',
      });

      return map;
    };

    const map = await initMapLoad(defaultAddress);

    await addMarkers(mapLocationData, map);
  } else {
    console.error('No data available.');
  }
};
