import { directions } from './directions';
import {
  loadRoutesFromStorage,
  saveRoutesToStorage,
} from '../../../store/routesStore';
import { showNavCard } from '../../../components/navCard/showNavCard';
import { routesValidation } from '../../../components/menu/tabs/createRoutesTab/routesValidation';
import { handleInfoButtonClick } from '../../../utils/handleInfoButtonClick';
import { directionsRenderers } from './directions';

const removeElements = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => element.remove());
};

export const applyDirections = async (map, markerPositions) => {
  const storedData = JSON.parse(localStorage.getItem('routesData'));
  const routesTabBody = document.querySelector('.menu-tab-body');

  storedData?.forEach((data) => {
    const pinNumbersToConnect = data.locationMapping
      ? data.locationMapping.split(',').map(Number)
      : [];

    if (pinNumbersToConnect.length > 0) {
      directions(map, markerPositions, pinNumbersToConnect, data.randomColor);
    }
  });

  routesTabBody.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.classList.contains('applyBtn')) {
      const tr = target.closest('tr');
      await handleApplyButtonClick(map, markerPositions, storedData, tr);
    }

    if (target.classList.contains('info')) {
      const tr = target.closest('tr');
      await handleInfoButtonClick(map, markerPositions, tr);
    }
  });
};

const handleApplyButtonClick = async (map, markerPositions, storedData, tr) => {
  if (!routesValidation(tr)) {
    return;
  }

  const invoiceNumber = tr.querySelector('input[name="locationMapping"]').value;
  const routeName = tr.firstChild.firstChild.value;

  const existingRouteIndex = storedData?.findIndex(
    (routeInfo) => routeInfo.routeName === routeName
  );
  if (existingRouteIndex !== -1 && directionsRenderers[existingRouteIndex]) {
    directionsRenderers[existingRouteIndex].setDirections({
      routes: [],
    });
  }
  removeElements('.card');
  removeElements('.bigCard');
  removeElements('.availabilityTable');

  const color = tr.firstChild.lastChild.style.backgroundColor;
  console.log("color", color, tr.firstChild.firstChild )
  try {
    const { distance } = await directions(
      map,
      markerPositions,
      invoiceNumber.split(',').map(Number),
      color
    );

    // Wait for directions to complete before proceeding
    saveRoutesToStorage(
      '.routesTableBody',
      'routesData',
      distance,
      color,
      tr.getAttribute('data-row-index')
    );
    showNavCard();
    location.reload();
  } catch (error) {
    console.error('Error calculating distances:', error);
  }
};
