import { createElement } from '../../utils/createElement';
import { createTable } from '../../utils/createTable';
import { calculateTotal } from '../../utils/calculateTotal';
import {
  createLoadWeightElement,
  createGaugeElement,
} from '../../utils/weightAndGauge';
const nav = document.querySelector('.nav-bar');

const createCard = () => {
  const card = createElement('div', 'card');
  return card;
};
const cardContainer = document.createElement('div');
cardContainer.classList.add('cardContainer');

export const navCard = ({
  routeName,
  selectedField,
  distance,
  locationMapping,
  randomColor,
  datePicker,
  highwayCost,
}) => {
  const storedVehicles = JSON.parse(localStorage.getItem('vehiclesData'));
  const mapLocationData = JSON.parse(localStorage.getItem('mapLocations'));
  const startingPin = locationMapping.split(',');
  const dateParts = datePicker ? datePicker.split('-') : [];
  const locationInvoice = mapLocationData.filter((data) => {
    const pinValues = startingPin.map((pinValue) => +pinValue + 1);
    return pinValues.includes(+data['RB naloga']);
  });

  const invoiceValueSum = () => {
    let totalValue = 0;
    locationInvoice.forEach((invoiceValue) => {
      totalValue += +invoiceValue['Vrednost naloga'];
    });
    return totalValue;
  };
  const routeVehicle = storedVehicles.find((storedVehicle) =>
    storedVehicle?.vehicle?.includes(selectedField)
  );
  const vehicleCost = +routeVehicle?.cost;
  const routeCost = distance * vehicleCost + +highwayCost;
  const routeInvoiceSum = invoiceValueSum();
  const profitabilityPercentage = Math.trunc(
    (routeInvoiceSum / (routeCost / 0.02)) * 100
  );
  const valueToProfitability = Math.trunc(
    routeInvoiceSum - routeCost / 0.02
  ).toLocaleString('en-GB');
  const profitabilityRatio = (routeCost / routeInvoiceSum) * 100;

  const routePriorities = locationInvoice.filter(
    (priority) => priority.Prioritet !== '/'
  ).length;

  const routeDuration = storedVehicles
    .filter((storedVehicle) => storedVehicle?.vehicle?.includes(selectedField))
    .map((storedVehicle) => {
      const vehicleSpeed = storedVehicle.averageSpeed;
      const routeTimeDuration = distance / vehicleSpeed;
      const hours = Math.floor(routeTimeDuration);
      const minutes = Math.round((routeTimeDuration - hours) * 60);

      return { hours, minutes };
    });

  const totalRouteLoad = calculateTotal(locationInvoice, 'Težina_kg');
  const totalGauge = calculateTotal(locationInvoice, 'Gabarit_m3');

  const loadWeightElement = createLoadWeightElement(
    totalRouteLoad,
    routeVehicle?.kg
  );
  const gaugeElement = createGaugeElement(totalGauge, routeVehicle?.m3);

  const cardBackgroundColor =
    (totalRouteLoad <= +routeVehicle?.kg && totalGauge <= +routeVehicle?.m3) ||
    (totalRouteLoad <= +routeVehicle?.kg && profitabilityRatio <= 2) ||
    (totalGauge <= +routeVehicle?.m3 && profitabilityRatio <= 2)
      ? '#FFA500'
      : totalRouteLoad <= +routeVehicle?.kg &&
        totalGauge <= +routeVehicle?.m3 &&
        profitabilityRatio <= 2
      ? '#19CB00'
      : '#FF3636';

  const card = createCard(cardBackgroundColor);

  const heading = createElement('h2', null, `${routeName}`);
  heading.style.background = randomColor;
  const vehicleText = createElement('p', null, '');

  vehicleText.innerHTML = `${
    datePicker
      ? `Datum: ${dateParts[2]}.${dateParts[1]}.${dateParts[0]}<br>`
      : 'Nema Datuma<br>'
  }Vozilo: ${selectedField}`;
  vehicleText.style.background = cardBackgroundColor;

  const [leftColumn, rightColum] = createTable(
    createElement('p', 'cardHeadings', 'Kriterijumi'),
    createElement('p', 'cardHeadings', 'Info')
  );

  leftColumn.appendChild(
    createElement('p', 'cardHeadings', `${profitabilityPercentage}%`)
  );
  leftColumn.appendChild(createElement('p', null, `${valueToProfitability}`));

  leftColumn.appendChild(loadWeightElement);

  leftColumn.appendChild(gaugeElement);
  leftColumn.appendChild(
    createElement('p', null, `${profitabilityRatio.toFixed(2)}`)
  );

  rightColum.appendChild(
    createElement(
      'p',
      null,
      `${routeDuration[0]?.hours}h ${routeDuration[0]?.minutes}min`
    )
  );
  rightColum.appendChild(
    createElement('p', null, `${Math.round(distance)} km`)
  );
  rightColum.appendChild(createElement('p', null, `Pr:${routePriorities}`));

  const cardInner = createTable(leftColumn, rightColum).reduce(
    (table, element) => {
      table.appendChild(element);
      return table;
    },
    createElement('div', 'infoCard')
  );

  const cardContent = createElement('div', 'cardContent');
  cardContent.appendChild(cardInner);

  card.addEventListener('mouseenter', () => {
    cardContent.style.display = 'block';
  });
  card.addEventListener('mouseleave', () => {
    cardContent.style.display = 'none';
  });

  card.appendChild(heading);
  card.appendChild(vehicleText);
  card.appendChild(cardContent);

  cardContainer.appendChild(card);
  nav.appendChild(cardContainer);
};
