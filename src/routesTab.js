export const routesTab = () => {
  const menuTabBody = document.querySelector('.menu-tab-body');
  const tbl = document.createElement('table');

  // TABLE MARKUPS
  const createTableHeader = (text) => {
    const th = document.createElement('th');
    th.innerHTML = text;
    return th;
  };

  const trHeading = document.createElement('tr');
  trHeading.appendChild(createTableHeader('Naziv rute'));
  trHeading.appendChild(createTableHeader('Unesi broj naloga'));
  trHeading.appendChild(createTableHeader('Vozilo'));
  trHeading.appendChild(createTableHeader('Unesi putarinu'));
  trHeading.appendChild(createTableHeader(''));

  const tableHeading = tbl.appendChild(trHeading);
  tableHeading.setAttribute('id', 'routesTable');
  menuTabBody.appendChild(tableHeading);

  // TABLE CONTENT
  const trBody = document.createElement('tr');
  const routesBody = document.createElement('td');
  routesBody.setAttribute('id', 'vehicleBody');

  const routeName = document.createElement('input');
  routeName.setAttribute('type', 'text');

  const invoiceNumberBody = document.createElement('input');
  invoiceNumberBody.setAttribute('type', 'number');

  const vehicleBody = document.createElement('div');
  vehicleBody.setAttribute('class', 'dropdown-container');

  const vehicleBodyInput = document.createElement('input');
  vehicleBodyInput.setAttribute('type', 'text');
  vehicleBodyInput.setAttribute('value', 'Odaberi vozilo');
  vehicleBodyInput.setAttribute('class', 'dropdown-input');
  vehicleBodyInput.setAttribute('readonly', 'readonly');

  vehicleBodyInput.addEventListener('click', (event) => {
    event.stopPropagation();

    const dropdownContainer = document.querySelector('.dropdown-container');
    dropdownContainer.classList.toggle('open');

    const dropdownContent = document.createElement('div');
    dropdownContent.setAttribute('class', 'dropdown-content');

    const label = document.createElement('label');
    label.setAttribute('class', 'radioLabel');
    const contentInput = document.createElement('input');
    contentInput.setAttribute('type', 'radio');
    contentInput.setAttribute('name', 'options');
    contentInput.setAttribute('value', 'option1');
    const labelText = document.createTextNode('Option 1');
    contentInput.addEventListener('click', () => {
      const dropdownInput = document.querySelector('.dropdown-input');
      dropdownInput.value = contentInput.value;
    });

    label.appendChild(contentInput);
    label.appendChild(labelText);
    dropdownContent.appendChild(label);
    vehicleBody.appendChild(dropdownContent);
  });

  document.addEventListener('click', (event) => {
    const dropdownContainer = document.querySelector('.dropdown-container');
    if (!dropdownContainer.contains(event.target)) {
      dropdownContainer.classList.remove('open');
    }
  });

  vehicleBody.appendChild(vehicleBodyInput);

  const highwayCostBody = document.createElement('input');
  highwayCostBody.setAttribute('type', 'number');

  const inputsBody = document.createElement('div');
  const applyBtn = document.createElement('button');
  applyBtn.innerHTML = 'Primeni';
  applyBtn.setAttribute('id', 'applyBtn');
  const lockBtn = document.createElement('p');
  lockBtn.setAttribute('class', 'lock ');
  lockBtn.addEventListener('click', () => {
    const routesTableBody = document.getElementById('routesTableBody');
    const inputs = routesTableBody.querySelectorAll('input');
    inputs.forEach((input) => {
      input.disabled = !input.disabled;
    });
  });

  trBody.appendChild(routeName);
  trBody.appendChild(invoiceNumberBody);
  trBody.appendChild(vehicleBody);
  trBody.appendChild(highwayCostBody);
  inputsBody.appendChild(applyBtn);
  inputsBody.appendChild(lockBtn);
  trBody.appendChild(inputsBody);

  const tableBody = tbl.appendChild(trBody);
  tableBody.setAttribute('id', 'routesTableBody');

  menuTabBody.appendChild(tableBody);

  const resetButton = document.createElement('div');
  resetButton.innerHTML = 'Resetuj sve rute';
  resetButton.setAttribute('id', 'resetRoutesBtn');
  menuTabBody.appendChild(resetButton);
};
