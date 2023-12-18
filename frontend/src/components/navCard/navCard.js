const nav = document.querySelector('.nav-bar');

export const navCard = ({ routeName, selectedField }) => {
  const createCardElement = (elementType, className) => {
    const element = document.createElement(elementType);
    if (className) {
      element.classList.add(className);
    }
    return element;
  };

  const createTextElement = (elementType, text, className) => {
    const element = createCardElement(elementType, className);
    element.textContent = text;
    return element;
  };

  const createTable = (leftContent, rightContent) => {
    const leftTable = createCardElement('div');
    const rightTable = createCardElement('div');

    leftTable.appendChild(leftContent);
    rightTable.appendChild(rightContent);

    return [leftTable, rightTable];
  };

  const card = createCardElement('div', 'card');
  const heading = createTextElement('h2', routeName);
  const vehicle = createTextElement('p', selectedField);

  const [leftTable, rightTable] = createTable(
    createTextElement('p', '90%', 'cardHeadings'),
    createTextElement('p', '230km')
  );

  leftTable.appendChild(createTextElement('p', '-102.000'));
  leftTable.appendChild(createTextElement('p', '350kg'));
  leftTable.appendChild(createTextElement('p', '16m3'));
  leftTable.appendChild(createTextElement('p', '7'));

  rightTable.appendChild(createTextElement('p', 'Pr:1'));

  const cardInner = createCardElement('div', 'infoCard');
  cardInner.appendChild(leftTable);
  cardInner.appendChild(rightTable);

  const cardContent = createCardElement('div', 'cardContent');
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
