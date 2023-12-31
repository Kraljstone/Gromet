import { navCard } from './navCard';
import { bigNavCard } from './bigNavCard';
import { navTable } from './navTable';

export const showNavCard = () => {
  const vehiclesData = JSON.parse(localStorage.getItem('vehiclesData')) || [];
  const routesData = JSON.parse(localStorage.getItem('routesData')) || [];
  const checkboxState = JSON.parse(localStorage.getItem('checkboxState'));
  const tableContainer = document.querySelector('.nav-btn-container');
  const bigScreenChecked = document.querySelector('.lock-extended-display');

  let toggle = true;
  let toggleTable = false;

  const smallCard = () => {
    routesData?.forEach((routeInfo) => {
      if (routeInfo.routeName !== '') {
        return navCard(routeInfo);
      }
    });
  };
  const bigCard = () => {
    const cardBig = document.querySelectorAll('.bigCard');
    cardBig.forEach((card) => {
      card.remove();
    });
    routesData?.forEach((routeInfo) => {
      if (routeInfo.routeName !== '') {
        bigNavCard(routeInfo);
      }
    });
  };

  if (toggle && !checkboxState) {
    smallCard();
  }

  if (checkboxState) {
    bigCard();
    navTable(routesData, vehiclesData);
    tableContainer.style.height = '250px';
    bigScreenChecked.checked = checkboxState;
    toggle = false;
    toggleTable = true;
  }

  const showAllTabs = document.querySelector('.show-tabs-btn');

  showAllTabs.addEventListener('click', () => {
    const card = document.querySelectorAll('.card');
    const cardBig = document.querySelectorAll('.bigCard');
    if (!toggle) {
      toggle = !toggle;
      card.forEach((card) => {
        card.remove();
      });
      cardBig.forEach((card) => {
        card.remove();
      });
      return smallCard();
    }

    card.forEach((card) => {
      card.remove();
    });

    bigCard();

    toggle = !toggle;
  });

  let availableTable;

  const availableTableBtn = document.querySelector('.available-vehicles');
  availableTableBtn.addEventListener('click', () => {
    availableTable = document.querySelector('.availabilityTable');

    if (toggleTable) {
      if (availableTable) {
        tableContainer.style.height = '50px';
        availableTable.remove();
      }
    } else {
      if (!availableTable) {
        navTable(routesData, vehiclesData);
        tableContainer.style.height = '250px';
        availableTable = document.querySelector('.availabilityTable');
      }
    }

    toggleTable = !toggleTable;
  });

  bigScreenChecked.addEventListener('change', (e) => {
    if (e.target.checked) {
      return localStorage.setItem(
        'checkboxState',
        JSON.stringify(e.target.checked)
      );
    }

    localStorage.removeItem('checkboxState');
  });
};
