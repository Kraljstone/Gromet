import { initMap } from './googleMap';
import { readDocsTab } from './readDocsTab';
import { vehicleTab } from './vehicleTab';
import { routesTab } from './routesTab';
import { card } from './card';
initMap();

//Toggle menu

const menuBtn = document.querySelector('.nav-bar-btn');

const menuWrap = () => {
  const menu = document.querySelector('.menu');

  if (menu.style.display === 'none') {
    return (menu.style.display = 'block');
  }
  menu.style.display = 'none';
};

menuBtn.addEventListener('click', menuWrap);

card();

//Active Tab functionality

const allTabs = document.querySelectorAll('.tab');

allTabs.forEach((singleTab) => {
  singleTab.addEventListener('click', () => {
    allTabs.forEach((e) => {
      e.classList.remove('menu-active-tab');
    });

    document.querySelector('.menu-tab-body').innerHTML = '';

    singleTab.classList.add('menu-active-tab');

    if (singleTab.classList[0] === 'read-doc-tab') {
      readDocsTab();
    }

    if (singleTab.classList[0] === 'vehicle-tab') {
      vehicleTab();
    }

    if (singleTab.classList[0] === 'routes-tab') {
      routesTab();
    }
  });
});
