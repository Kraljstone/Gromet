import { menuTabs } from './menuTabs';
import { readDocsTab } from './tabs/readDocsTab';

const navBarSelector = document.querySelector('.nav-bar-btn');
const menuSelector = document.querySelector('.menu');
const menuBody = document.querySelector('.menu-tab-body');

//Toggle Menu

export const menu = () => {
  if (menuSelector.style.display === 'none' || !menuSelector.style.display) {
    menuSelector.style.display = 'block';
    return readDocsTab();
  }

  menuBody.innerHTML = '';
  menuSelector.style.display = 'none';
};

navBarSelector.addEventListener('click', menu);

// Loading all Tabs
menuTabs();
