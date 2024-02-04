import { menuTabs } from './menuTabs';
import { readDocsTab } from './tabs/readDocsTab';
import {createRoutesTab} from './tabs/createRoutesTab/createRoutesTab';

const navBarSelector = document.querySelector('.nav-bar-btn');
const menuSelector = document.querySelector('.menu');
const menuBody = document.querySelector('.menu-tab-body');

//Toggle Menu

export const menu = () => {
  if (menuSelector.style.display === 'none' || !menuSelector.style.display) {
    menuSelector.style.display = 'block';
    const routesTab = document.querySelector('.routes-tab');
    routesTab.classList.add('menu-active-tab');
    return createRoutesTab();
  }

  menuBody.innerHTML = '';
  menuSelector.style.display = 'none';
  const tabs = document.querySelectorAll('.tabs');
  tabs.forEach((tab) => tab.classList.remove('menu-active-tab'));
};

navBarSelector.addEventListener('click', menu);

// Loading all Tabs
menuTabs();
