import { directions } from './directions';
import {
  saveRoutesToStorage,
  loadRoutesFromStorage,
} from '../../../store/routesStore';
import { showNavCard } from '../../../components/navCard/showNavCard';
import { generateRandomColor } from '../../../utils/generateRandomColor';
import { routesValidation } from '../../../components/menu/tabs/createRoutesTab/routesValidation';

export const applyDirections = async (map, markerPositions) => {
  const storedData = JSON.parse(localStorage.getItem('routesData'));
  const checkBox = JSON.parse(localStorage.getItem('checkboxState'));
  const routesTabBody = document.querySelector('.menu-tab-body');

  storedData?.forEach((data) => {
    let pinNumbersToConnect = [];
    if (data.locationMapping) {
      pinNumbersToConnect = data.locationMapping.split(',').map(Number);
    }
    if (pinNumbersToConnect.length > 0) {
      directions(map, markerPositions, pinNumbersToConnect, data.randomColor);
    }
  });

  routesTabBody.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('applyBtn')) {
      const tr = target.closest('tr');
      routesValidation(tr);
      const invoiceNumber = tr.querySelector(
        'input[name="locationMapping"]'
      ).value;

      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        card.remove();
      });

      const bigCards = document.querySelectorAll('.bigCard');
      bigCards.forEach((card) => {
        card.remove();
      });

      if (!checkBox) {
        const navTable = document.querySelector('.availabilityTable');
        navTable?.remove();
      }
      const nav = document.querySelector('.nav-btn-container');
      nav.style.height = 'auto';

      const routeColor =
        event.target.parentElement.parentElement.firstChild.lastChild;
      const color = generateRandomColor();
      routeColor.style.background = color;

      const distancePromises = new Promise(async (resolve, reject) => {
        try {
          const distance = await directions(
            map,
            markerPositions,
            invoiceNumber.split(',').map(Number),
            color
          );
          resolve(distance);
        } catch (error) {
          console.error(error);
          reject(error);
        }
      });

      distancePromises
        .then((distances) => {
          saveRoutesToStorage(
            '.routesTableBody',
            'routesData',
            distances,
            color
          );
          loadRoutesFromStorage('routesData');
          showNavCard();
        })
        .catch((error) => {
          console.error('Error calculating distances:', error);
        });
    }
  });
};
