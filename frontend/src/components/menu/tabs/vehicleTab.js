import {
  loadVehiclesFromStorage,
  saveVehiclesToStorage,
} from '../../../store/vehicleStore';
import { navTable } from '../../navCard/navTable';

export const vehicleTab = () => {
  const menuTabBody = document.querySelector('.menu-tab-body');
  const tbl = document.createElement('table');

  // TABLE MARKUPS
  const headings = [
    '',
    'Vozilo',
    'Nosivost (Kg)',
    'Gabarit (m³)',
    'Trošak (RSD)',
    'Pročna brzina (km/h)',
    'Vreme istovara (min)',
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
    i.addEventListener('click', (event) => {
      event.target.parentElement.parentElement.remove();
    });
    i.setAttribute('class', 'gg-trash');
    deleteBtn.appendChild(i);

    const vehicle = createInputElement('text', 'vehicle');
    const kg = createInputElement('number', 'kg');
    const m3 = createInputElement('number', 'm3');
    const cost = createInputElement('number', 'cost');
    const averageSpeed = createInputElement('text', 'averageSpeed');
    const deliveryTime = createInputElement('text', 'deliveryTime');

    vehicleBody.appendChild(deleteBtn);
    vehicleBody.appendChild(vehicle);
    vehicleBody.appendChild(kg);
    vehicleBody.appendChild(m3);
    vehicleBody.appendChild(cost);
    vehicleBody.appendChild(averageSpeed);
    vehicleBody.appendChild(deliveryTime);
    trBody.appendChild(vehicleBody);

    const table = tbl.appendChild(trBody);
    table.setAttribute('id', 'vehicleTable');

    menuTabBody.insertBefore(table, addVehicleBtn);
    menuTabBody.insertBefore(table, saveVehicleBtn);

    rowIndex++;
  };

  // ADD VEHICLES BTN
  const addVehicleBtn = document.createElement('div');
  addVehicleBtn.innerHTML = 'Dodaj vozilo +';
  addVehicleBtn.setAttribute('class', 'addVehicleBtn');
  addVehicleBtn.addEventListener('click', addVehicleFn);
  const saveVehicleBtn = document.createElement('div');
  saveVehicleBtn.innerHTML = 'Sacuvaj vozilo';
  saveVehicleBtn.setAttribute('class', 'addVehicleBtn');
  saveVehicleBtn.addEventListener('click', () => {
    saveVehiclesToStorage('.vehicleRow', 'vehiclesData');
    alert('vozilo je sacuvano');
  });

  menuTabBody.appendChild(saveVehicleBtn);
  menuTabBody.appendChild(addVehicleBtn);

  navTable();
};
