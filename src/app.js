import { initMap } from './googleMap';
import { readDocsTab } from './readDocsTab';
import { vehicleTab } from './vehicleTab';
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

//Active Tab functionality

const allTabs = document.querySelectorAll('.tab');

allTabs.forEach((singleTab) => {
  singleTab.addEventListener('click', () => {
    // Remove the 'active-box' class from all boxes
    allTabs.forEach((e) => {
      e.classList.remove('menu-active-tab');
    });

    // Add the 'active-box' class to the clicked box
    singleTab.classList.add('menu-active-tab');

    if (singleTab.classList[0] === 'read-doc-tab') {
      readDocsTab();
    }

    if (singleTab.classList[0] === 'vehicle-tab') {
      vehicleTab();
    }
  });
});
