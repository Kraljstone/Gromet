import { addMarkers } from './addMarkers';
import { getCoordinates } from './getCoordinates';

export let GLOBAL_MAP;
export const initMap = async () => {
  const mapLocationData = JSON.parse(localStorage.getItem('mapLocations'));
  const defaultLocation = mapLocationData?.[0];
  if (mapLocationData?.length > 0) {
    const defaultAddress = await getCoordinates(
      `${defaultLocation?.Adresa},${defaultLocation?.Mesto}`
    );

    const initMapLoad = async (addressCoordinates) => {
      const { Map } = await google.maps.importLibrary('maps');
      let map = new Map(document.getElementById('map'), {
        zoom: 7.5,
        center: addressCoordinates,
        mapId: '3eecad6d62fb1776',
      });

      return map;
    };

    const map = await initMapLoad(defaultAddress);
    GLOBAL_MAP = map;
    console.log(GLOBAL_MAP, "GLOBAL_MAP")

    await addMarkers(mapLocationData, map);
  } else {
    console.error('No data available.');
    setTimeout(() => {
      alert('Nema prethodno ucitanih podataka');
    }, 1000);
  }
};
