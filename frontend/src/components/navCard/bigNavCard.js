import { createElement } from '../../utils/createElement';
import { createTable } from '../../utils/createTable';
import {
  createLoadWeightElement,
  createGaugeElement,
} from '../../utils/weightAndGauge';
import { calculateTotal } from '../../utils/calculateTotal';
const nav = document.querySelector('.nav-bar');

const cardContainer = document.createElement('div');
cardContainer.classList.add('cardContainer');

export const bigNavCard = ({
  routeName,
  selectedField,
  distance,
  locationMapping,
  datePicker,
  highwayCost,
}) => {
  const storedVehicles = JSON.parse(localStorage.getItem('vehiclesData'));
  const mapLocationData = JSON.parse(localStorage.getItem('mapLocations'));
  const startingPin = locationMapping.split(',');
  const card = createElement('div', 'bigCard');
  const heading = createElement(
    'h2',
    null,
    `Ruta ${routeName} (${selectedField})`
  );
  const day = createElement('p');
  const dateParts = datePicker ? datePicker.split('-') : [];
  day.innerHTML = datePicker
    ? `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`
    : 'Nema Datuma';

  const routeVehicle = storedVehicles.find((vehicle) => {
    return vehicle.vehicle.includes(selectedField);
  });

  const vehicleCost = +routeVehicle?.cost;
  const routeCost = Math.round(distance) * vehicleCost + +highwayCost;
  const locationInvoice = mapLocationData.filter((data) => {
    const pinValues = startingPin.map((pinValue) => +pinValue + 1);
    return pinValues.includes(+data['RB naloga']);
  });

  console.log('highwayCost', highwayCost);
  console.log('vehicleCost', vehicleCost);
  console.log(
    '(distance * vehicleCost )',
    Math.round(distance) * vehicleCost,
    Math.round(distance)
  );
  console.log('routeCost', routeCost);

  const routeInvoiceSum = calculateTotal(locationInvoice, 'Vrednost naloga');
  console.log('routeInvoiceSum', routeInvoiceSum);

  const valueToProfitability = Math.trunc(
    routeInvoiceSum - routeCost / 0.02
  ).toLocaleString('en-GB');
  console.log('valueToProfitability', valueToProfitability);

  const profitabilityPercentage = Math.trunc(
    (routeInvoiceSum / (routeCost / 0.02)) * 100
  );
  console.log(
    'procenat isplativosti - profitabilityPercentage',
    profitabilityPercentage
  );

  const profitabilityRatio = (routeCost / routeInvoiceSum) * 100;
  console.log('koef isplativosti - profitabilityRatio', profitabilityRatio);

  const routePriorities = locationInvoice.filter(
    (priority) => priority.Prioritet !== '/'
  ).length;

  const totalRouteLoad = calculateTotal(locationInvoice, 'Težina_kg');
  const totalGauge = calculateTotal(locationInvoice, 'Gabarit_m3');

  const loadWeightElement = createLoadWeightElement(
    totalRouteLoad,
    routeVehicle.kg
  );
  const gaugeElement = createGaugeElement(totalGauge, routeVehicle.m3);

  if (
    totalRouteLoad <= +routeVehicle.kg &&
    totalGauge <= +routeVehicle.m3 &&
    profitabilityRatio <= 2
  ) {
    //green
    const PASSED_3_CRITERIA_GREEN = '#64e100';
    card.style.background = PASSED_3_CRITERIA_GREEN;
  } else {
    const FAILED_ONE_CRITERIA_RED = '#ff1400';
    card.style.background = FAILED_ONE_CRITERIA_RED;
  }

  const [leftColumn, rightColumn] = createTable(
    createElement('p', 'cardHeadings', 'kriterijumi'),
    createElement('p', 'cardHeadings', 'info')
  );
  leftColumn.appendChild(
    createElement('p', null, `${profitabilityPercentage}%`)
  );
  leftColumn.appendChild(createElement('p', null, `${valueToProfitability}`));
  leftColumn.appendChild(loadWeightElement);
  leftColumn.appendChild(gaugeElement);

  rightColumn.appendChild(
    createElement('p', null, `${Math.round(distance)} km`)
  );

  rightColumn.appendChild(createElement('p', null, `Pr:${routePriorities}`));

  const cardInner = createTable(leftColumn, rightColumn).reduce(
    (table, element) => {
      table.appendChild(element);
      return table;
    },
    createElement('div', 'bigInfoCard')
  );

  const cardContent = createElement('div', 'bigCardContent');
  cardContent.appendChild(cardInner);

  card.appendChild(heading);
  card.appendChild(day);
  card.appendChild(cardContent);

  cardContainer.appendChild(card);
  nav.appendChild(cardContainer);
};
