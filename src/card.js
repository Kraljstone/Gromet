export const card = ({
  highwayCost,
  invoiceNumberBody,
  routeName,
  selectedField,
}) => {
  const nav = document.querySelector('.nav-bar');
  const card = document.createElement('div');
  card.setAttribute('id', 'card');
  const heading = document.createElement('h2');
  heading.innerHTML = routeName;
  const vehicle = document.createElement('p');
  vehicle.innerHTML = selectedField;

  const cardContent = document.createElement('div');
  cardContent.setAttribute('id', 'cardContent');
  const cardInner = document.createElement('div');
  cardInner.setAttribute('id', 'infoCard')

  const leftSide = document.createElement('div');
  const rightSide = document.createElement('div');

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

  leftSide.appendChild(profitabilityPercentage);
  leftSide.appendChild(valueToProfitability);
  leftSide.appendChild(goodsWeight);
  leftSide.appendChild(goodsM3);
  leftSide.appendChild(coefficientOfValue);

  rightSide.appendChild(totalDistance);
  rightSide.appendChild(priorityCustomer);

  cardInner.appendChild(leftSide);
  cardInner.appendChild(rightSide);

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
