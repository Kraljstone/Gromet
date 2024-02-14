import { navCard } from './navCard';
import { bigNavCard } from './bigNavCard';
import { navTable } from './navTable';

export const showNavCard = () => {
  const vehiclesData = JSON.parse(localStorage.getItem('vehiclesData')) || [];
  const routesData = JSON.parse(localStorage.getItem('routesData')) || [];
  const checkboxState = JSON.parse(localStorage.getItem('checkboxState'));
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
    routesData?.forEach((routeInfo, index) => {
      if (routeInfo.routeName !== '') {
        console.log("routeInfo", routeInfo);
        bigNavCard(routeInfo, index);
      }
    });
  };

  if (toggle && !checkboxState) {
    smallCard();
  }

  if (checkboxState) {
    bigCard();
    navTable(routesData, vehiclesData);
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
