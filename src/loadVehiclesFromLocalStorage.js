export const loadVehiclesFromLocalStorage = (rowIndex, createInputElement) => {
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
  });
};
