import { initMap } from './api/googleMap/googleMap';
import { navCard } from './components/navCard/navCard';
import { menu } from './components/menu/menu';
import { showNavCard } from './components/navCard/showNavCard';
initMap();

//Side Menu
menu();

showNavCard();
