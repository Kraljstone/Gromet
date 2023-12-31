import { createElement } from '../../utils/createElement';
import { createTable } from '../../utils/createTable';
import {
  createLoadWeightElement,
  createGaugeElement,
} from '../../utils/weightAndGauge';
import { calculateTotal } from '../../utils/calculateTotal';
import data from '../../../../mapLocations.json';
const nav = document.querySelector('.nav-bar');

export const bigNavCard = ({
  routeName,
  selectedField,
  distance,
  locationMapping,
  datePicker,
}) => {
  const storedVehicles = JSON.parse(localStorage.getItem('vehiclesData'));
  const mapLocationData = data;
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

  const routeVehicle = storedVehicles.find((vehicle) =>
    vehicle.vehicle.includes(selectedField)
  );

  const vehicleCost = +routeVehicle.cost;
  const routeCost = vehicleCost + +routeVehicle.highwayCost;
  const locationInvoice = mapLocationData.filter((data) =>
    startingPin.map((pinValue) => +pinValue + 1).includes(+data['RB naloga'])
  );

  const routeInvoiceSum = calculateTotal(locationInvoice, 'Vrednost naloga');
  const valueToProfitability = Math.round(
    routeInvoiceSum - routeCost / 0.02
  ).toLocaleString('en-GB');
  const profitabilityPercentage = Math.round(
    (routeInvoiceSum / (routeCost / 0.02)) * 100
  );
  const profitabilityRatio = Math.round((routeCost / routeInvoiceSum) * 100);
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
    card.style.background = '#19CB00';
  } else {
    card.style.background = '#FF3636';
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
  nav.appendChild(card);
};
