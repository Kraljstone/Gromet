import {
  loadVehiclesFromStorage,
  saveVehiclesToStorage,
} from '../../../../vehiclesAndRoutes.js';

export const vehicleTab = () => {
  const menuTabBody = document.querySelector('.menu-tab-body');
  const tbl = document.createElement('table');

  // TABLE MARKUPS
  const headings = [
    '',
    'Vozilo',
    'Kg',
    'm³',
    'Trošak',
    'Putarina',
    'Pročna brzina (km/h)',
    'Vreme istovara',
  ];

  const trHeading = document.createElement('tr');
  const table = tbl.appendChild(trHeading);
  table.setAttribute('id', 'vehicleTable');

  headings.forEach((headingText) => {
    const th = document.createElement('th');
    th.innerHTML = headingText;
    table.appendChild(th);
  });

  menuTabBody.appendChild(table);

  // TABLE CONTENT
  let rowIndex = 0;

  const createInputElement = (type, name) => {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    input.addEventListener('blur', function () {
      input.setAttribute('disabled', 'disabled');
      // Save input values to local storage on blur
      saveVehiclesToStorage('.vehicleRow', 'vehiclesData');
    });
    return input;
  };

  loadVehiclesFromStorage(rowIndex, createInputElement);

  const addVehicleFn = () => {
    const trBody = document.createElement('tr');
    trBody.classList.add('vehicleRow');
    trBody.setAttribute('data-row-index', rowIndex);

    const vehicleBody = document.createElement('td');
    vehicleBody.setAttribute('id', 'vehicleBody');

    const deleteBtn = document.createElement('div');
    const i = document.createElement('i');
    i.setAttribute('class', 'gg-trash');
    deleteBtn.appendChild(i);

    const vehicle = createInputElement('text', 'vehicle');
    const kg = createInputElement('number', 'kg');
    const m3 = createInputElement('number', 'm3');
    const cost = createInputElement('number', 'cost');
    const highwayCost = createInputElement('number', 'highwayCost');
    const averageSpeed = createInputElement('text', 'averageSpeed');
    const deliveryTime = createInputElement('text', 'deliveryTime');

    vehicleBody.appendChild(deleteBtn);
    vehicleBody.appendChild(vehicle);
    vehicleBody.appendChild(kg);
    vehicleBody.appendChild(m3);
    vehicleBody.appendChild(cost);
    vehicleBody.appendChild(highwayCost);
    vehicleBody.appendChild(averageSpeed);
    vehicleBody.appendChild(deliveryTime);
    trBody.appendChild(vehicleBody);

    const table = tbl.appendChild(trBody);
    table.setAttribute('id', 'vehicleTable');
    menuTabBody.insertBefore(table, addVehicleBtn);

    rowIndex++;
  };

  // ADD VEHICLES BTN
  const addVehicleBtn = document.createElement('div');
  addVehicleBtn.innerHTML = 'Dodaj vozilo +';
  addVehicleBtn.setAttribute('class', 'addVehicleBtn');
  addVehicleBtn.addEventListener('click', addVehicleFn);
  menuTabBody.appendChild(addVehicleBtn);
};
