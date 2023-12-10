import { directions } from './directions';

export const applyDirections = (map, markerPositions) => {
  const storedData = JSON.parse(localStorage.getItem('routesData'));

  storedData?.forEach((data) => {
    let pinNumbersToConnect = [];
    if (data.invoiceNumberBody) {
      pinNumbersToConnect = data.invoiceNumberBody.split(',').map(Number);
    }
    if (pinNumbersToConnect.length > 0) {
      directions(map, markerPositions, pinNumbersToConnect, data.randomColor);
    }
  });

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
    }
  });
};
