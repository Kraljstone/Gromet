export async function initMap() {
  // The location of Serbia
  const position = { lat: 44, lng: 21 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

  // The map, centered at Serbia
  let map = new Map(document.getElementById('map'), {
    zoom: 8,
    center: position,
    mapId: '3eecad6d62fb1776',
  });

  // The marker, positioned at warehouse
  new AdvancedMarkerElement({
    map,
    position: position,
    title: 'Warehouse',
  });
}