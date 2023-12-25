import { addMarkers } from './addMarkers';
import data from '../../../../mapLocations.json';
import { getCoordinates } from './getCoordinates';


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
