import { createElement } from './createElement';

export const createTable = (leftContent, rightContent) => {
  const leftTable = createElement('div');
  const rightTable = createElement('div');

  leftTable.appendChild(leftContent);
  rightTable.appendChild(rightContent);

  return [leftTable, rightTable];
};