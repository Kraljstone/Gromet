export async function initMap() {
  // The location of Uluru
  const position = { lat: 44, lng: 20.457273 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement } = await google.maps.importLibrary('marker');

  // The map, centered at Uluru
  map = new Map(document.getElementById('map'), {
    zoom: 8,
    center: position,
    mapId: 'DEMO_MAP_ID',
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: 'Uluru',
  });
}