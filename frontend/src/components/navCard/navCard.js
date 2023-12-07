const nav = document.querySelector('.nav-bar');

export const navCard = ({
  highwayCost,
  invoiceNumberBody,
  routeName,
  selectedField,
}) => {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');
  const heading = document.createElement('h2');
  heading.innerHTML = routeName;
  const vehicle = document.createElement('p');
  vehicle.innerHTML = selectedField;

  const cardContent = document.createElement('div');
  cardContent.setAttribute('class', 'cardContent');
  const cardInner = document.createElement('div');
  cardInner.setAttribute('class', 'infoCard');

  const leftTable = document.createElement('div');
  const rightTable = document.createElement('div');

  const profitabilityPercentage = document.createElement('p');
  profitabilityPercentage.innerHTML = '90%';

  const valueToProfitability = document.createElement('p');
  valueToProfitability.innerHTML = '-102.000';

  const goodsWeight = document.createElement('p');
  goodsWeight.innerHTML = '350kg';

  const goodsM3 = document.createElement('p');
  goodsM3.innerHTML = '16m3';

  const coefficientOfValue = document.createElement('p');
  coefficientOfValue.innerHTML = 7;

  const totalDistance = document.createElement('p');
  totalDistance.innerHTML = '230km';

  const priorityCustomer = document.createElement('p');
  priorityCustomer.innerHTML = 'Pr:1';

  leftTable.appendChild(profitabilityPercentage);
  leftTable.appendChild(valueToProfitability);
  leftTable.appendChild(goodsWeight);
  leftTable.appendChild(goodsM3);
  leftTable.appendChild(coefficientOfValue);

  rightTable.appendChild(totalDistance);
  rightTable.appendChild(priorityCustomer);

  cardInner.appendChild(leftTable);
  cardInner.appendChild(rightTable);

  cardContent.appendChild(cardInner);

  card.addEventListener('mouseenter', () => {
    cardContent.style.display = 'block';
  });
  card.addEventListener('mouseleave', () => {
    cardContent.style.display = 'none';
  });

  card.appendChild(heading);
  card.appendChild(vehicle);
  card.appendChild(cardContent);
  nav.appendChild(card);
};
