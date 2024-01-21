import data from '../../../mapLocations.json';
import { calculateDistance } from './calculateDistance';
import { routesValidation } from '../components/menu/tabs/createRoutesTab/routesValidation';
import { directions } from '../api/googleMap/directions/directions';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';

export const handleInfoButtonClick = async (map, markerPositions, tr) => {
  if (!routesValidation(tr)) {
    return;
  }

  const invoiceNumber = tr.querySelector('input[name="locationMapping"]').value;
  const highwayCost = tr.querySelector('input[name="highwayCost"]').value;
  const color = tr.parentElement.firstChild.lastChild.style.backgroundColor;

  try {
    const { response } = await directions(
      map,
      markerPositions,
      invoiceNumber.split(',').map(Number),
      color
    );

    const distanceBetweenPins = calculateDistance(
      response,
      invoiceNumber.split(',').map(Number),
      highwayCost,
      data
    );

    const tooltipContent = generateTooltipContent(distanceBetweenPins);
    tippy(tr.querySelector('.info'), {
      content: tooltipContent,
      placement: 'top',
      allowHTML: true,
    });
  } catch (error) {
    console.error('Error calculating distances:', error);
  }
};

const generateTooltipContent = (distances) => {
  let combinedContent = '';

  for (const distanceObj of distances) {
    const {
      pins,
      valueToProfitability,
      profitabilityPercentage,
      duration,
      distance,
    } = distanceObj;
    combinedContent += `
      Pinovi: ${pins}<br>
      Vrednost do isplativosti: ${valueToProfitability}<br>
      Procenat isplativosti: ${profitabilityPercentage}%<br>
      Procenjeno vreme: ${duration}<br>
      Udaljenost: ${distance}<br><br>
    `;
  }

  return combinedContent;
};
