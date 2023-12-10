import { initMap } from './api/googleMap/googleMap';
import { navCard } from './components/navCard/navCard';
import { menu } from './components/menu/menu';
initMap();

//Side Menu
menu();

const routesData = JSON.parse(localStorage.getItem('routesData'));

routesData?.forEach((data) => {
  if (data.routeName !== '') {
    navCard(data);
  }
});
