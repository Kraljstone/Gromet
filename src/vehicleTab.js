export const vehicleTab = () => {
  const menuTabBody = document.querySelector('.menu-tab-body');
  const tbl = document.createElement('table');
  const tr = document.createElement('tr');

  const vehicle = document.createElement('td');
  vehicle.innerHTML = 'Vozilo';

  const kg = document.createElement('td');
  kg.innerHTML = 'Kg';

  const m3 = document.createElement('td');
  m3.innerHTML = 'm³';

  const cost = document.createElement('td');
  cost.innerHTML = 'trošak';

  const highwayCost = document.createElement('td');
  highwayCost.innerHTML = 'Putarina';

  const averageSpeed = document.createElement('td');
  averageSpeed.innerHTML = 'Pročna brzina (km/h)';

  const deliveryTime = document.createElement('td');
  deliveryTime.innerHTML = 'Vreme istovara';

  tr.appendChild(vehicle);
  tr.appendChild(kg);
  tr.appendChild(m3);
  tr.appendChild(cost);
  tr.appendChild(highwayCost);
  tr.appendChild(averageSpeed);
  tr.appendChild(deliveryTime);

  const table = tbl.appendChild(tr);
  table.setAttribute('id', 'vehicleTable');

  menuTabBody.appendChild(table);

  const addVehicleBtn = document.createElement('div')
  addVehicleBtn.innerHTML = 'Dodaj vozilo +'
  addVehicleBtn.setAttribute('id', 'addVehicleBtn')
};
