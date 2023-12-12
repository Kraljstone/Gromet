import { navCard } from './navCard';
import { bigNavCard } from './bigNavCard';

export const showNavCard = () => {
  const routesData = JSON.parse(localStorage.getItem('routesData'));

  let toggle = true;

  const smallCard = () => {
    routesData?.forEach((data) => {
      if (data.routeName !== '') {
        navCard(data);
      }
    });
  };

  if (toggle) {
    smallCard();
  }

  const bigCard = () => {
    routesData?.forEach((data) => {
      if (data.routeName !== '') {
        bigNavCard(data);
      }
    });
  };

  const showAllTabs = document.querySelector('.show-tabs-btn');

  showAllTabs.addEventListener('click', () => {
    const card = document.querySelectorAll('.card');
    const cardBig = document.querySelectorAll('.bigCard');
    if (!toggle) {
      toggle = !toggle;
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
};
