import {
  loadVehiclesFromStorage,
  saveVehiclesToStorage,
} from '../../../../vehiclesAndRoutes';
import { addVehicle } from './addVehicle';

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
  table.setAttribute('class', 'vehicleTable');

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

  // ADD VEHICLES BTN
  const addVehicleBtn = document.createElement('div');
  addVehicleBtn.innerHTML = 'Dodaj vozilo +';
  addVehicleBtn.setAttribute('class', 'addVehicleBtn');
  addVehicleBtn.addEventListener('click', () => addVehicle(rowIndex));
  menuTabBody.appendChild(addVehicleBtn);
};
