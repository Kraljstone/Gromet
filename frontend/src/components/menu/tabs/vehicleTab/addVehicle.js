const menuTabBody = document.querySelector('.menu-tab-body');

const addVehicleBtn = document.querySelector('.addVehicleBtn');

export const addVehicle = (rowIndex) => {
  const trBody = document.createElement('tr');
  trBody.classList.add('vehicleRow');
  trBody.setAttribute('data-row-index', rowIndex);

  const vehicleBody = document.createElement('td');
  vehicleBody.setAttribute('class', 'vehicleBody');

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
  table.setAttribute('class', 'vehicleTable');
  menuTabBody.insertBefore(table, addVehicleBtn);

  rowIndex++;
};
