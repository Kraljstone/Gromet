export const createElement = (elementType, className, text) => {
  const element = document.createElement(elementType);
  if (className) {
    element.classList.add(className);
  }
  if (text) {
    element.textContent = text;
  }
  return element;
};
