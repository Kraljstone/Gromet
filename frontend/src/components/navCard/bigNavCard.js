const nav = document.querySelector('.nav-bar');
export const bigNavCard = (date) => {
  const card = document.createElement('div');
  card.setAttribute('class', 'bigCard');
  const heading = document.createElement('h2');
  heading.innerHTML = `Ruta ${date.routeName} (${date.selectedField})`;
  const day = document.createElement('p');
  const dateParts = date.datePicker.split('-');
  day.innerHTML = date.datePicker ? `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}` : 'Nema Datuma';

  const cardContent = document.createElement('div');
  cardContent.setAttribute('class', 'bigCardContent');
  const cardInner = document.createElement('div');
  cardInner.setAttribute('class', 'bigInfoCard');

  const leftTable = document.createElement('div');
  const rightTable = document.createElement('div');

  const profitabilityPercentageContainer = document.createElement('div');
  const criteria = document.createElement('p');
  criteria.classList = 'cardHeadings'
  criteria.innerHTML = 'kriterijumi';
  const profitabilityPercentage = document.createElement('p');
  profitabilityPercentage.innerHTML = '90%';
  profitabilityPercentageContainer.appendChild(criteria);
  profitabilityPercentageContainer.appendChild(profitabilityPercentage);

  const valueToProfitability = document.createElement('p');
  valueToProfitability.innerHTML = '-102.000';

  const goodsWeight = document.createElement('p');
  goodsWeight.innerHTML = '350kg';

  const goodsM3 = document.createElement('p');
  goodsM3.innerHTML = '16m3';

  const coefficientOfValue = document.createElement('p');
  coefficientOfValue.innerHTML = 7;

  const totalDistanceContainer = document.createElement('div');
  const info = document.createElement('p');
  info.innerHTML = 'info';
  info.classList = 'cardHeadings'
  const totalDistance = document.createElement('p');
  totalDistance.innerHTML = '230km';
  totalDistanceContainer.appendChild(info);
  totalDistanceContainer.appendChild(totalDistance);

  const priorityCustomer = document.createElement('p');
  priorityCustomer.innerHTML = 'Pr:1';

  leftTable.appendChild(profitabilityPercentageContainer);
  leftTable.appendChild(valueToProfitability);
  leftTable.appendChild(goodsWeight);
  leftTable.appendChild(goodsM3);
  leftTable.appendChild(coefficientOfValue);

  rightTable.appendChild(totalDistanceContainer);
  rightTable.appendChild(priorityCustomer);

  cardInner.appendChild(leftTable);
  cardInner.appendChild(rightTable);

  cardContent.appendChild(cardInner);

  card.appendChild(heading);
  card.appendChild(day);
  card.appendChild(cardContent);
  nav.appendChild(card);
};
