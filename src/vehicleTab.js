import { loadVehiclesFromLocalStorage } from './loadVehiclesFromLocalStorage';

export const vehicleTab = () => {
  const menuTabBody = document.querySelector('.menu-tab-body');
  const tbl = document.createElement('table');

  // TABLE MARKUPS
  const trHeading = document.createElement('tr');
  const emptyEl = document.createElement('th');

  const vehicle = document.createElement('th');
  vehicle.innerHTML = 'Vozilo';

  const kg = document.createElement('th');
  kg.innerHTML = 'Kg';

  const m3 = document.createElement('th');
  m3.innerHTML = 'm³';

  const cost = document.createElement('th');
  cost.innerHTML = 'trošak';

  const highwayCost = document.createElement('th');
  highwayCost.innerHTML = 'Putarina';

  const averageSpeed = document.createElement('th');
  averageSpeed.innerHTML = 'Pročna brzina (km/h)';

  const deliveryTime = document.createElement('th');
  deliveryTime.innerHTML = 'Vreme istovara';

  trHeading.appendChild(emptyEl);
  trHeading.appendChild(vehicle);
  trHeading.appendChild(kg);
  trHeading.appendChild(m3);
  trHeading.appendChild(cost);
  trHeading.appendChild(highwayCost);
  trHeading.appendChild(averageSpeed);
  trHeading.appendChild(deliveryTime);

  const table = tbl.appendChild(trHeading);
  table.setAttribute('id', 'vehicleTable');
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
      saveVehiclesToLocalStorage();
    });
    return input;
  };

  const saveVehiclesToLocalStorage = () => {
    const vehicles = [];

    const rows = document.querySelectorAll('.vehicleRow');
    rows.forEach((row, index) => {
      const inputs = row.querySelectorAll('input[name]');
      const vehicleData = {};

      inputs.forEach((input) => {
        vehicleData[input.name] = input.value;
      });

      vehicles.push(vehicleData);
    });

    localStorage.setItem('vehiclesData', JSON.stringify(vehicles));
  };

  loadVehiclesFromLocalStorage(rowIndex, createInputElement);

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

    saveVehiclesToLocalStorage();
  };

  // ADD VEHICLES BTN
  const addVehicleBtn = document.createElement('div');
  addVehicleBtn.innerHTML = 'Dodaj vozilo +';
  addVehicleBtn.setAttribute('id', 'addVehicleBtn');
  addVehicleBtn.addEventListener('click', addVehicleFn);
  menuTabBody.appendChild(addVehicleBtn);
};
