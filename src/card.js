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
