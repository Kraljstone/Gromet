import { directions } from './directions';
import { navCard } from '../../../components/navCard/navCard';

export const applyDirections = (map, markerPositions) => {
  const storedData = JSON.parse(localStorage.getItem('routesData'));
  const routesTabBody = document.querySelector('.menu-tab-body');

  let newData = {
    routeName: '',
    selectedField: 'Odaberi Vozilo',
  };

  routesTabBody.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('applyBtn')) {
      const tr = target.closest('tr');
      const routeName = tr.querySelector('input[name="routeName"]').value;
      const invoiceNumber = tr.querySelector(
        'input[name="invoiceNumberBody"]'
      ).value;
      const selectedField = tr.querySelector('.dropdown-input').value;

      // Iterate over storedData and connect pins for each row's data
      storedData?.forEach(({ randomColor }) => {
        directions(
          map,
          markerPositions,
          invoiceNumber.split(',').map(Number),
          randomColor
        );
      });

      if (routeName !== '' && selectedField !== 'Odaberi Vozilo') {
        if (
          routeName !== newData.routeName &&
          selectedField !== newData.selectedField
        ) {
          newData.routeName = routeName;
          newData.selectedField = selectedField;

          navCard({ routeName, selectedField });
        }
      }
    }
  });
};
