import { readDocsTab } from './tabs/readDocsTab';
import { vehicleTab } from './tabs/vehicleTab';
import { createComboTab } from './tabs/comboTab';
import { createRoutesTab } from './tabs/createRoutesTab/createRoutesTab';

const allTabs = document.querySelectorAll('.tabs');

export const menuTabs = () => {
  //Active Tab functionality

  allTabs.forEach((singleTab) => {
    singleTab.addEventListener('click', () => {
      allTabs.forEach((event) => {
        event.classList.remove('menu-active-tab');
      });

      document.querySelector('.menu-tab-body').innerHTML = '';

      singleTab.classList.add('menu-active-tab');

      if (singleTab.classList.contains('read-doc-tab')) {
        readDocsTab();
      }
      
      if (singleTab.classList.contains('vehicle-tab')) {
        vehicleTab();
      }

      if (singleTab.classList.contains('combo-tab')) {
        createComboTab();
      }
      
      if (singleTab.classList.contains('routes-tab')) {
        createRoutesTab();
      }
    });
  });
};
