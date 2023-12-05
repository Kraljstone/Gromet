export const saveVehiclesToStorage = (selector, storageKey) => {
  const vehicles = [];

  const rows = document.querySelectorAll(selector);

  rows.forEach((row) => {
    const inputs = row.querySelectorAll('input[name]');
    const data = {};

    inputs.forEach((input) => {
      data[input.name] = input.value;
    });

    vehicles.push(data);
  });

  localStorage.setItem(storageKey, JSON.stringify(vehicles));
};

export const saveRoutesToStorage = (selector, storageKey) => {
  const vehicles = [];

  const rows = document.querySelectorAll(selector);

  rows.forEach((row) => {
    const inputs = row.querySelectorAll('input[name], select[name]');
    const data = {};

    inputs.forEach((input) => {
      data[input.name] = input.value;
    });

    const selectElement = Array.from(inputs).find(
      (input) => input.nodeName.toLowerCase() === 'select'
    );

    if (selectElement) {
      data[Object.keys(data)[2]] = selectElement.value;
    }

    vehicles.push(data);
  });

  localStorage.setItem(storageKey, JSON.stringify(vehicles));
};

export const loadVehiclesFromStorage = (rowIndex, createInputElement) => {
  const tableHead = document.querySelector('#vehicleTable');
  const menuTabBody = document.querySelector('.menu-tab-body');
  const tbl = document.createElement('table');

  const storedVehicles = JSON.parse(localStorage.getItem('vehiclesData')) || [];
  const reversedVehicles = storedVehicles.slice().reverse();

  reversedVehicles.forEach((vehicleData) => {
    const trBody = document.createElement('tr');
    trBody.classList.add('vehicleRow');
    trBody.setAttribute('data-row-index', rowIndex);

    const vehicleBody = document.createElement('td');
    vehicleBody.setAttribute('id', 'vehicleBody');

    const deleteBtn = document.createElement('div');
    const i = document.createElement('i');
    i.setAttribute('class', 'gg-trash');
    deleteBtn.appendChild(i);
    vehicleBody.appendChild(deleteBtn);

    const keysOrder = [
      'vehicle',
      'kg',
      'm3',
      'cost',
      'highwayCost',
      'averageSpeed',
      'deliveryTime',
    ];

    keysOrder.forEach((key) => {
      const inputValue = vehicleData[key];
      const input = createInputElement(
        key.includes('number') ? 'number' : 'text',
        key
      );
      input.value = inputValue || '';
      input.setAttribute('disabled', 'disabled');

      vehicleBody.appendChild(input);
    });

    trBody.appendChild(vehicleBody);

    const table = tbl.appendChild(trBody);
    table.setAttribute('id', 'vehicleTable');
    menuTabBody.insertBefore(table, tableHead.nextSibling);

    rowIndex++;

    deleteBtn.addEventListener('click', (e) => {
      const rowIndex =
        e.target.parentElement.parentElement.parentElement.getAttribute(
          'data-row-index'
        );
      deleteRow(rowIndex);
    });
  });
};

export const loadRoutesFromStorage = (selector, data) => {
  const storedData = localStorage.getItem(data);

  if (storedData) {
    const vehicles = JSON.parse(storedData);

    const rows = document.querySelectorAll(selector);

    rows.forEach((row, rowIndex) => {
      const inputs = row.querySelectorAll('input[name], select[name]');

      inputs.forEach((input) => {
        const inputName = input.name;
        const inputData = vehicles?.[rowIndex]?.[inputName];

        // Check if the data for the input exists
        if (inputData !== undefined) {
          // Handle select elements separately
          if (input.nodeName.toLowerCase() === 'select') {
            // Ensure the option exists before setting the value
            if (
              [...input.options].some((option) => option.value === inputData)
            ) {
              input.value = inputData;
            }
          } else {
            input.value = inputData;
          }
        }
      });
    });
  }
};

const deleteRow = (rowIndex) => {
  const rows = document.querySelectorAll('.vehicleRow');

  rows.forEach((row) => {
    if (row.getAttribute('data-row-index') == rowIndex) {
      row.remove();
    }
  });

  // Remove entry from local storage
  const storedVehicles = JSON.parse(localStorage.getItem('vehiclesData')) || [];
  const reversedIndex = storedVehicles.length - 1 - rowIndex;

  const updatedVehicles = storedVehicles.filter(
    (_, index) => index !== reversedIndex
  );
  localStorage.setItem('vehiclesData', JSON.stringify(updatedVehicles));
};
