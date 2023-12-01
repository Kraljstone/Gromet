export const routesTab = () => {
  const menuTabBody = document.querySelector('.menu-tab-body');
  const tbl = document.createElement('table');
  const tr = document.createElement('tr');

  const route = document.createElement('th');
  route.innerHTML = 'Naziv rute';

  const invoiceNumber = document.createElement('th');
  invoiceNumber.innerHTML = 'Unesi broj naloga';

  const vehicle = document.createElement('th');
  vehicle.innerHTML = 'Vozilo';

  const highwayCost = document.createElement('th');
  highwayCost.innerHTML = 'Unesi putarinu';

  const empty = document.createElement('th');

  tr.appendChild(route);
  tr.appendChild(invoiceNumber);
  tr.appendChild(vehicle);
  tr.appendChild(highwayCost);
  tr.appendChild(empty);

  const table = tbl.appendChild(tr);
  table.setAttribute('id', 'vehicleTable');

  menuTabBody.appendChild(table);

  const resetButton = document.createElement('div');
  resetButton.innerHTML = 'Resetuj sve rute';
  resetButton.setAttribute('id', 'resetRoutesBtn')
  menuTabBody.appendChild(resetButton);
};
