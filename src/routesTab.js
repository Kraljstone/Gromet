import {
  loadRoutesFromStorage,
  saveRoutesToStorage,
} from './vehiclesAndRoutes';

export const routesTab = () => {
  const menuTabBody = document.querySelector('.menu-tab-body');

  const tbl = document.createElement('table');

  // Function to create table header cell
  const createTableHeader = (text) => {
    const th = document.createElement('th');
    th.innerHTML = text;
    return th;
  };

  // Create table header row
  const trHeading = document.createElement('tr');
  trHeading.appendChild(createTableHeader('Naziv rute'));
  trHeading.appendChild(createTableHeader('Unesi broj naloga'));
  trHeading.appendChild(createTableHeader('Vozilo'));
  trHeading.appendChild(createTableHeader('Unesi putarinu'));
  trHeading.appendChild(createTableHeader(''));

  // Add the table header row to the table
  const tableHeading = tbl.appendChild(trHeading);
  tableHeading.setAttribute('id', 'routesTable');
  menuTabBody.appendChild(tableHeading);

  const createInputElement = (type, name) => {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    input.setAttribute('disabled', 'disabled');
    input.addEventListener('blur', function () {
      saveRoutesToStorage('#routesTableBody', 'routesData');
    });
    return input;
  };
  // Generate table content for each row

  for (let i = 0; i < 4; i++) {
    // Create a table row
    const trBody = document.createElement('tr');

    // Create cells for each column
    const routeName = createInputElement('text', 'routeName');
    const invoiceNumberBody = createInputElement('text', 'invoiceNumberBody');

    const vehicleBodySelect = document.createElement('select');
    vehicleBodySelect.setAttribute('class', 'dropdown-input');
    vehicleBodySelect.setAttribute('name', 'selectedField');
    vehicleBodySelect.setAttribute('disabled', 'disabled');

    const vehicleBodyOptionOne = document.createElement('option');
    vehicleBodyOptionOne.innerHTML = 'Odaberi Vozilo';
    vehicleBodySelect.appendChild(vehicleBodyOptionOne);

    vehicleBodySelect.addEventListener('change', (e) => {
      saveRoutesToStorage('#routesTableBody', 'routesData');
    });

    const storedData = JSON.parse(localStorage.getItem('vehiclesData'));

    storedData.forEach((data) => {
      const otherVehicleBodyOptions = document.createElement('option');
      otherVehicleBodyOptions.innerHTML = data.vehicle;
      otherVehicleBodyOptions.setAttribute('value', data.vehicle);
      vehicleBodySelect.appendChild(otherVehicleBodyOptions);
    });

    const highwayCostBody = createInputElement('number', 'highwayCost');
    const inputsBody = document.createElement('div');
    const applyBtn = document.createElement('button');
    applyBtn.innerHTML = 'Primeni';
    applyBtn.setAttribute('id', 'applyBtn');
    applyBtn.setAttribute('disabled', 'disabled');

    const lockBtn = document.createElement('p');
    lockBtn.setAttribute('class', 'lock ');

    // Event listener for the lock button
    lockBtn.addEventListener('click', () => {
      const tr = lockBtn.closest('tr');
      const disableDropdown = tr.querySelector('.dropdown-input');
      disableDropdown.disabled = !disableDropdown.disabled;
      applyBtn.disabled = !applyBtn.disabled;
      const inputs = tr.querySelectorAll('input');
      inputs.forEach((input) => {
        input.disabled = !input.disabled;
      });
    });

    // Append elements to the table row
    trBody.appendChild(routeName);
    trBody.appendChild(invoiceNumberBody);
    trBody.appendChild(vehicleBodySelect);
    trBody.appendChild(highwayCostBody);
    inputsBody.appendChild(applyBtn);
    inputsBody.appendChild(lockBtn);
    trBody.appendChild(inputsBody);

    // Add the table row to the table
    const tableBody = tbl.appendChild(trBody);
    tableBody.setAttribute('id', 'routesTableBody');
    tableBody.setAttribute('data-row-index', i);

    // Add the table row to the routes tab container
    menuTabBody.appendChild(tableBody);
  }
  loadRoutesFromStorage('#routesTableBody', 'routesData');

  // Create a "Reset All Routes" button
  const resetButtonContainer = document.createElement('div');
  resetButtonContainer.setAttribute('id', 'resetButtonContainer');
  const resetButton = document.createElement('button');
  resetButton.innerHTML = 'Resetuj sve rute';
  resetButton.setAttribute('id', 'resetRoutesBtn');
  resetButton.addEventListener('click', () => {
    const rows = document.querySelectorAll('#routesTableBody');

    rows.forEach((row) => {
      const inputs = row.querySelectorAll('input[name]');

      inputs.forEach((input) => {
        input.value = '';
      });
    });

    localStorage.removeItem('routesData');
  });

  resetButton.innerHTML = 'Resetuj sve rute';
  resetButtonContainer.appendChild(resetButton);
  menuTabBody.appendChild(resetButtonContainer);
};
