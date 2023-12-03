export const routesTab = () => {
  // Get the container for the routes tab
  const menuTabBody = document.querySelector('.menu-tab-body');

  // Create a table element
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

  // Generate table content for each row
  for (let i = 0; i < 4; i++) {
    // Create a table row
    const trBody = document.createElement('tr');

    // Create cells for each column
    const routeName = document.createElement('input');
    routeName.setAttribute('type', 'text');

    const invoiceNumberBody = document.createElement('input');
    invoiceNumberBody.setAttribute('type', 'number');

    const vehicleBody = document.createElement('div');
    vehicleBody.setAttribute('class', 'dropdown-container');

    const vehicleBodySelect = document.createElement('select');
    vehicleBodySelect.setAttribute('class', 'dropdown-input');
    const vehicleBodyOptionOne = document.createElement('option');
    vehicleBodyOptionOne.innerHTML = 'Kombi';
    vehicleBodyOptionOne.setAttribute('value', 'Kombi');
    const vehicleBodyOptionTwo = document.createElement('option');
    vehicleBodyOptionTwo.innerHTML = 'Auto';
    vehicleBodyOptionTwo.setAttribute('value', 'Auto');

    vehicleBodySelect.appendChild(vehicleBodyOptionOne);
    vehicleBodySelect.appendChild(vehicleBodyOptionTwo);
    vehicleBody.appendChild(vehicleBodySelect);

    const highwayCostBody = document.createElement('input');
    highwayCostBody.setAttribute('type', 'number');

    const inputsBody = document.createElement('div');
    const applyBtn = document.createElement('button');
    applyBtn.innerHTML = 'Primeni';
    applyBtn.setAttribute('id', 'applyBtn');

    const lockBtn = document.createElement('p');
    lockBtn.setAttribute('class', 'lock ');

    // Event listener for the lock button
    lockBtn.addEventListener('click', () => {
      const tr = lockBtn.closest('tr');
      const disableDropdown = tr.querySelector('.dropdown-input');
      disableDropdown.disabled = !disableDropdown.disabled;

      const inputs = tr.querySelectorAll('input');
      inputs.forEach((input) => {
        input.disabled = !input.disabled;
      });
    });

    // Append elements to the table row
    trBody.appendChild(routeName);
    trBody.appendChild(invoiceNumberBody);
    trBody.appendChild(vehicleBody);
    trBody.appendChild(highwayCostBody);
    inputsBody.appendChild(applyBtn);
    inputsBody.appendChild(lockBtn);
    trBody.appendChild(inputsBody);

    // Add the table row to the table
    const tableBody = tbl.appendChild(trBody);
    tableBody.setAttribute('id', 'routesTableBody');
    tableBody.setAttribute('index', i);

    // Add the table row to the routes tab container
    menuTabBody.appendChild(tableBody);
  }

  // Create a "Reset All Routes" button
  const resetButton = document.createElement('div');
  resetButton.innerHTML = 'Resetuj sve rute';
  resetButton.setAttribute('id', 'resetRoutesBtn');
  menuTabBody.appendChild(resetButton);
};
