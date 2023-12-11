import { directions } from './directions';
import { showNavCard } from '../../../components/navCard/showNavCard';

export const applyDirections = (map, markerPositions) => {
  const storedData = JSON.parse(localStorage.getItem('routesData'));

  const routesTabBody = document.querySelector('.menu-tab-body');

  routesTabBody.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('applyBtn')) {
      const tr = target.closest('tr');
      const routeName = tr.querySelector('input[name="routeName"]').value;
      const invoiceNumberBody = tr.querySelector(
        'input[name="invoiceNumberBody"]'
      ).value;

      let randomColor;

      storedData?.forEach((data) => {
        randomColor = data.randomColor;
      });

      const data = {
        routeName,
        invoiceNumberBody,
        randomColor,
        // Add other properties as needed
      };
      // Connect pins for the current row's data
      directions(
        map,
        markerPositions,
        data.invoiceNumberBody.split(',').map(Number),
        randomColor
      );

      showNavCard();
    }
  });
};
