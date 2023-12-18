import { directions } from './directions';

export const applyDirections = async (map, markerPositions) => {
  const storedData = JSON.parse(localStorage.getItem('routesData'));
  const routesTabBody = document.querySelector('.menu-tab-body');

  storedData?.forEach((data) => {
    let pinNumbersToConnect = [];
    if (data.invoiceNumberBody) {
      pinNumbersToConnect = data.invoiceNumberBody.split(',').map(Number);
    }
    if (pinNumbersToConnect.length > 0) {
      directions(map, markerPositions, pinNumbersToConnect, data.randomColor);
    }
  });

  routesTabBody.addEventListener('click', (event) => {
    const target = event.target;
    if (target.classList.contains('applyBtn')) {
      const tr = target.closest('tr');
      const invoiceNumber = tr.querySelector(
        'input[name="invoiceNumberBody"]'
      ).value;
      // Iterate over storedData and connect pins for each row's data

      storedData?.forEach(({ randomColor }) => {
        directions(
          map,
          markerPositions,
          invoiceNumber.split(',').map(Number),
          randomColor
        );
      });
    }
  });
};
