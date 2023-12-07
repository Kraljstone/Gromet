import { readDocsTab } from './tabs/readDocsTab';
import { vehicleTab } from './tabs/vehicleTab/vehicleTab';
import { createRoutesTab } from './tabs/createRoutesTab';

const allTabs = document.querySelectorAll('.tab');

export const menuTabs = () => {
  //Active Tab functionality

  allTabs.forEach((singleTab) => {
    singleTab.addEventListener('click', () => {
      allTabs.forEach((event) => {
        event.classList.remove('menu-active-tab');
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
        createRoutesTab();
      }
    });
  });
};
