const createElement = (elementType, className, text) => {
  const element = document.createElement(elementType);
  if (className) {
    element.classList.add(className);
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};

const createTable = (leftContent, rightContent) => {
  const leftTable = createElement('div');
  const rightTable = createElement('div');

  leftTable.appendChild(leftContent);
  rightTable.appendChild(rightContent);

  return [leftTable, rightTable];
};

export const bigNavCard = (date) => {
  const nav = document.querySelector('.nav-bar');
  const card = createElement('div', 'bigCard');
  const heading = createElement(
    'h2',
    null,
    `Ruta ${date.routeName} (${date.selectedField})`
  );
  const day = createElement('p');
  const dateParts = date.datePicker ? date.datePicker.split('-') : [];
  day.innerHTML = date.datePicker
    ? `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`
    : 'Nema Datuma';

  const [leftTable, rightTable] = createTable(
    createElement('p', 'cardHeadings', 'kriterijumi'),
    createElement('p', null, '90%')
  );

  leftTable.appendChild(createElement('p', null, '-102.000'));
  leftTable.appendChild(createElement('p', null, '350kg'));
  leftTable.appendChild(createElement('p', null, '16m3'));
  leftTable.appendChild(createElement('p', null, '7'));

  rightTable.appendChild(
    createTable(
      createElement('p', 'cardHeadings', 'info'),
      createElement('p', null, '230km')
    ).reduce((table, element) => {
      table.appendChild(element);
      return table;
    }, document.createElement('div'))
  );

  rightTable.appendChild(createElement('p', null, 'Pr:1'));

  const cardInner = createElement('div', 'bigInfoCard');
  cardInner.appendChild(leftTable);
  cardInner.appendChild(rightTable);

  const cardContent = createElement('div', 'bigCardContent');
  cardContent.appendChild(cardInner);

  card.appendChild(heading);
  card.appendChild(day);
  card.appendChild(cardContent);
  nav.appendChild(card);
};
