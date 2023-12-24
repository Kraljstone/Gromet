import { createElement } from './createElement';

const createIconElement = (iconClass) => {
  const icon = createElement('i');
  icon.classList.add('fas', `fa-solid`, iconClass);
  return icon;
};

export const createLoadWeightElement = (totalLoad, vehicleLimit) => {
  const element = createElement('p');
  element.innerHTML = `${totalLoad} kg`;
  if (totalLoad > +vehicleLimit) {
    const overLoadIcon = createIconElement('fa-weight-hanging');
    element.appendChild(overLoadIcon);
  }
  return element;
};

export const createGaugeElement = (totalGauge, vehicleLimit) => {
  const element = createElement('p');
  element.innerHTML = `${totalGauge} m3`;
  if (totalGauge > +vehicleLimit) {
    const gaugeIcon = createIconElement('fa-times-circle gaugeIcon');
    element.appendChild(gaugeIcon);
  }
  return element;
};
