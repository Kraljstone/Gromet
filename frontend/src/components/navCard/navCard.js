import { createElement } from '../../utils/createElement';
import { createTable } from '../../utils/createTable';
import data from '../../../../mapLocations.json';
const nav = document.querySelector('.nav-bar');


const createIcon = (iconClassList) => {
  const icon = createElement('i');
  icon.classList.add(...iconClassList);
  return icon;
};

const createCard = (backgroundColor) => {
  const card = createElement('div', 'card');
  card.style.background = backgroundColor;
  return card;
};

const createLoadWeightElement = (weight, limit, iconClassList) => {
  const loadWeight = createElement('p');
  loadWeight.innerHTML = `${weight} kg`;
  const overLoad = createIcon(iconClassList);
  if (weight > limit) {
    loadWeight.appendChild(overLoad);
  }
  return loadWeight;
};

export const navCard = ({
  routeName,
  selectedField,
  distance,
  invoiceNumberBody,
}) => {
  const storedVehicles = JSON.parse(localStorage.getItem('vehiclesData'));
  const mapLocationData = data;
  const startingPin = invoiceNumberBody.split(',');
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
    storedVehicle.vehicle.includes(selectedField)
  );

  const vehicleCost = +routeVehicle?.cost;
  const routeCost = vehicleCost + +routeVehicle.highwayCost;
  const routeInvoiceSum = invoiceValueSum();
  const profitabilityPercentage = Math.round(
    (routeInvoiceSum / (routeCost / 0.02)) * 100
  );
  const valueToProfitability = Math.round(
    routeInvoiceSum - routeCost / 0.02
  ).toLocaleString('en-GB');
  const profitabilityRatio = Math.round((routeCost / routeInvoiceSum) * 100);

  const routePriorities = locationInvoice.filter(
    (priority) => priority.Prioritet !== '/'
  ).length;

  const routeDuration = storedVehicles
    .filter((storedVehicle) => storedVehicle.vehicle.includes(selectedField))
    .map((storedVehicle) => {
      const vehicleSpeed = storedVehicle.averageSpeed;
      const routeTimeDuration = distance / vehicleSpeed;
      const hours = Math.floor(routeTimeDuration);
      const minutes = Math.round((routeTimeDuration - hours) * 60);

      return { hours, minutes };
    });

  const totalRouteLoad = locationInvoice.reduce((sum, load) => {
    const weight = +load.Težina_kg;
    return weight ? sum + weight : sum;
  }, 0);

  const totalGauge = locationInvoice.reduce((sum, gauge) => {
    const gaugeSize = +gauge.Gabarit_m3;
    return gaugeSize ? sum + gaugeSize : sum;
  }, 0);

  const cardBackgroundColor =
    totalRouteLoad <= +routeVehicle.kg &&
    totalGauge <= +routeVehicle.m3 &&
    profitabilityRatio <= 2
      ? '#19CB00'
      : '#FF3636';

  const card = createCard(cardBackgroundColor);

  const heading = createElement('h2', null, routeName);
  const vehicleText = createElement('p', null, selectedField);

  const [leftTable, rightTable] = createTable(
    createElement('p', 'cardHeadings', 'Kriterijumi'),
    createElement('p', 'cardHeadings', 'Info')
  );

  leftTable.appendChild(
    createElement('p', 'cardHeadings', `${profitabilityPercentage}%`)
  );
  leftTable.appendChild(createElement('p', null, `${valueToProfitability}`));

  leftTable.appendChild(
    createLoadWeightElement(
      routeVehicle.kg,
      +routeVehicle.kg,
      ['fas', 'fa-solid', 'fa-weight-hanging']
    )
  );

  const gauge = createElement('p', null, `${routeVehicle.m3} m3 `);
  const gaugeIcon = createIcon(['fas', 'fa-times-circle', 'gaugeIcon']);
  if (totalGauge > +routeVehicle.m3) {
    gauge.appendChild(gaugeIcon);
  }

  leftTable.appendChild(gauge);
  leftTable.appendChild(createElement('p', null, `${profitabilityRatio}`));

  rightTable.appendChild(
    createElement(
      'p',
      null,
      `${routeDuration[0].hours}h ${routeDuration[0].minutes}min`
    )
  );
  rightTable.appendChild(createElement('p', null, `${Math.round(distance)} km`));
  rightTable.appendChild(createElement('p', null, `Pr:${routePriorities}`));

  const cardInner = createTable(leftTable, rightTable).reduce(
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

  nav.appendChild(card);
};
