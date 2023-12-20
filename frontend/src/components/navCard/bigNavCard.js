import { createElement } from '../../utils/createElement';
import { createTable } from '../../utils/createTable';
import data from '../../../../mapLocations.json';
const nav = document.querySelector('.nav-bar');

const calculateTotal = (items, property) => {
  return items.reduce((sum, item) => sum + +item[property], 0);
};

const createIconElement = (iconClass) => {
  const icon = createElement('i');
  icon.classList.add('fas', `fa-solid`, iconClass);
  return icon;
};

const createLoadWeightElement = (totalLoad, vehicleLimit) => {
  const element = createElement('p');
  element.innerHTML = `${totalLoad} kg`;
  if (totalLoad > +vehicleLimit) {
    const overLoadIcon = createIconElement('fa-weight-hanging');
    element.appendChild(overLoadIcon);
  }
  return element;
};

const createGaugeElement = (totalGauge, vehicleLimit) => {
  const element = createElement('p');
  element.innerHTML = `${totalGauge} m3`;
  if (totalGauge > +vehicleLimit) {
    const gaugeIcon = createIconElement('fa-times-circle gaugeIcon');
    element.appendChild(gaugeIcon);
  }
  return element;
};

export const bigNavCard = ({
  routeName,
  selectedField,
  distance,
  invoiceNumberBody,
  datePicker,
}) => {
  const storedVehicles = JSON.parse(localStorage.getItem('vehiclesData'));
  const mapLocationData = data;
  const startingPin = invoiceNumberBody.split(',');
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
  createGaugeElement(totalGauge, routeVehicle.m3);

  if (
    totalRouteLoad <= +routeVehicle.kg &&
    totalGauge <= +routeVehicle.m3 &&
    profitabilityRatio <= 2
  ) {
    card.style.background = '#19CB00';
  } else {
    card.style.background = '#FF3636';
  }

  const [leftTable, rightTable] = createTable(
    createElement('p', 'cardHeadings', 'kriterijumi'),
    createElement('p', 'cardHeadings', 'info')
  );

  leftTable.appendChild(createElement('p', null, `${valueToProfitability}`));
  leftTable.appendChild(loadWeightElement);
  leftTable.appendChild(createGaugeElement('p', null, `${profitabilityRatio}`));

  rightTable.appendChild(
    createTable(
      createElement('p', null, `${profitabilityPercentage}%`),
      createElement('p', null, `${Math.round(distance)} km`)
    ).reduce((table, element) => {
      table.appendChild(element);
      return table;
    }, createElement('div'))
  );

  rightTable.appendChild(createElement('p', null, `Pr:${routePriorities}`));

  const cardInner = createTable(leftTable, rightTable).reduce(
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
