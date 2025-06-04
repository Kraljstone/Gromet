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
  const filteredAddresses = mapLocationData ? mapLocationData.filter((data) => {
    return startingPin.includes(data['RB naloga']);
  }) : [];

  // console.log("Loc invoice", locationInvoice);
  // const uniqueAddresses = [
  //   ...new Set(locationInvoice.map((data) => data.Adresa)),
  // ];

  // const filteredAddresses = mapLocationData.filter((data) =>
  //   uniqueAddresses.includes(data.Adresa)
  // );

  // console.log("filterADR", filteredAddresses);
  const invoiceValueSum = () => {
    let totalValue = 0;
    filteredAddresses.forEach((invoiceValue) => {
      totalValue += +invoiceValue['Vrednost naloga'];
    });
    return totalValue;
  };

  const routeVehicle = storedVehicles.find((storedVehicle) =>
    storedVehicle?.vehicle?.includes(selectedField)
  );
  const vehicleCost = +routeVehicle?.cost;
  const routeCost = Math.round(distance) * vehicleCost + +highwayCost;
  const routeInvoiceSum = invoiceValueSum();
  console.log("routeInvoiceSum:", routeInvoiceSum);
  const profitabilityPercentage = Math.trunc(
    (routeInvoiceSum / (routeCost / 0.02)) * 100
  );
  const valueToProfitability = Math.trunc(
    routeInvoiceSum - routeCost / 0.02
  ).toLocaleString('en-GB');  
  const profitabilityRatio = (routeCost / routeInvoiceSum) * 100;

  const routePriorities = filteredAddresses.filter(
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

  const totalRouteLoad = calculateTotal(filteredAddresses, 'Težina_kg');
  const totalGauge = calculateTotal(filteredAddresses, 'Gabarit_m3');

  const loadWeightElement = createLoadWeightElement(
    totalRouteLoad,
    routeVehicle?.kg
  );
  const gaugeElement = createGaugeElement(totalGauge, routeVehicle?.m3);

  const PASSED_3_CRITERIA_GREEN = '#64e100';
  const PASSED_2_CRITERIA_ORANGE = '#FFA500';
  const FAILED_ONE_CRITERIA_RED = '#ff1400';

  const cardShouldBeGreen =
    totalRouteLoad <= +routeVehicle?.kg &&
    totalGauge <= +routeVehicle?.m3 &&
    profitabilityRatio <= 2;

  const cardShouldBeOrange =
    (totalRouteLoad <= +routeVehicle?.kg && totalGauge <= +routeVehicle?.m3) ||
    (totalRouteLoad <= +routeVehicle?.kg && profitabilityRatio <= 2) ||
    (totalGauge <= +routeVehicle?.m3 && profitabilityRatio <= 2);

  const cardBackgroundColor = cardShouldBeGreen
    ? PASSED_3_CRITERIA_GREEN
    : cardShouldBeOrange
    ? PASSED_2_CRITERIA_ORANGE
    : FAILED_ONE_CRITERIA_RED;

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


  const unloadVehicleTotal = routeVehicle.deliveryTime * filteredAddresses.length;

  const unloadHours = Math.floor(unloadVehicleTotal / 60);
  const unloadMinutes = unloadVehicleTotal - (unloadHours*60);
  // console.log("filteredAdr", filteredAddresses, filteredAddresses.length, routeVehicle.deliveryTime);
  rightColum.appendChild(
    createElement(
      'p',
      null,
      `${routeDuration[0]?.hours}h ${routeDuration[0]?.minutes} minuta, ${unloadHours}h ${unloadMinutes} minuta`

    )
  );
  rightColum.appendChild(
    createElement('p', null, `${Math.round(distance)} km`)
  );
  rightColum.appendChild(createElement('p', null, `Pr:${routePriorities}`));

  rightColum.appendChild(
    createElement('p', null, `${profitabilityRatio.toFixed(2)}`)
  );

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
  // const prevCardContainers = nav.querySelectorAll('.cardContainer');
  // if(prevCardContainers.length > 1){
  //   nav.removeChild(prevCardContainer[0]);
  // }
  nav.appendChild(cardContainer);
};
