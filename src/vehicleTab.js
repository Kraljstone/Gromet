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
  const createInputElement = (type) => {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.addEventListener('blur', function () {
      input.setAttribute('disabled', 'disabled');
    });
    return input;
  };

  const addVehicleFn = () => {
    const trBody = document.createElement('tr');
    const vehicleBody = document.createElement('td');
    vehicleBody.setAttribute('id', 'vehicleBody');

    const deleteBtn = document.createElement('div');
    const i = document.createElement('i');
    i.setAttribute('class', 'gg-trash');
    deleteBtn.appendChild(i);

    const vehicle = createInputElement('text');
    const kg = createInputElement('number');
    const m3 = createInputElement('number');
    const cost = createInputElement('number');
    const highwayCost = createInputElement('number');
    const averageSpeed = createInputElement('text');
    const deliveryTime = createInputElement('text');

    // Disable the vehicle input on blur
    

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
  };

  // ADD VEHICLES BTN
  const addVehicleBtn = document.createElement('div');
  addVehicleBtn.innerHTML = 'Dodaj vozilo +';
  addVehicleBtn.setAttribute('id', 'addVehicleBtn');
  addVehicleBtn.addEventListener('click', addVehicleFn);
  menuTabBody.appendChild(addVehicleBtn);
};
