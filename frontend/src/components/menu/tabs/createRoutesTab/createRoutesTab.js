import {
  loadRoutesFromStorage,
  saveRoutesToStorage,
} from '../../../../store/routesStore';
import { clearDirections } from '../../../../api/googleMap/directions/directions';
import { showNavCard } from '../../../navCard/showNavCard';
import { routesReset } from './routesReset';
import { routesHead } from './routesHead';

export const createRoutesTab = () => {
  const menuTabBody = document.querySelector('.menu-tab-body');
  const tbl = document.createElement('table');
  routesHead();

  const createInputElement = (type, name) => {
    const input = document.createElement('input');
    input.setAttribute('type', type);
    input.setAttribute('name', name);
    input.setAttribute('disabled', 'disabled');
    return input;
  };
  // Generate table content for each row

  for (let i = 0; i < 4; i++) {
    // Create a table row
    const trBody = document.createElement('tr');

    // Create cells for each column
    const routeAndColor = document.createElement('div');
    routeAndColor.setAttribute('class', 'routeAndColor');
    const routeName = createInputElement('text', 'routeName');
    const color = document.createElement('p');
    color.innerHTML = 'a';
    color.setAttribute('class', 'pinConnectColor');

    routeAndColor.appendChild(routeName);
    routeAndColor.appendChild(color);
    const invoiceNumberBody = createInputElement('text', 'invoiceNumberBody');

    const vehicleBodySelect = document.createElement('select');
    vehicleBodySelect.setAttribute('class', 'dropdown-input');
    vehicleBodySelect.setAttribute('name', 'selectedField');
    vehicleBodySelect.setAttribute('disabled', 'disabled');

    const vehicleBodyOptionOne = document.createElement('option');
    vehicleBodyOptionOne.innerHTML = 'Odaberi Vozilo';
    vehicleBodySelect.appendChild(vehicleBodyOptionOne);

    const storedData = JSON.parse(localStorage.getItem('vehiclesData'));

    storedData?.forEach((data) => {
      const otherVehicleBodyOptions = document.createElement('option');
      otherVehicleBodyOptions.innerHTML = data.vehicle;
      otherVehicleBodyOptions.setAttribute('value', data.vehicle);
      vehicleBodySelect.appendChild(otherVehicleBodyOptions);
    });

    const highwayCostBody = createInputElement('number', 'highwayCost');
    const inputsBody = document.createElement('div');
    const applyBtn = document.createElement('button');
    applyBtn.innerHTML = 'Primeni';
    applyBtn.setAttribute('class', 'applyBtn');
    applyBtn.setAttribute('disabled', 'disabled');
    applyBtn.addEventListener('click', () => {
      saveRoutesToStorage('.routesTableBody', 'routesData');
      const cards = document.querySelectorAll('.card');
      cards.forEach((card) => {
        card.remove();
      });

      clearDirections();
      loadRoutesFromStorage('routesData');
      showNavCard();
    });

    const datePickContainer = document.createElement('div');
    datePickContainer.classList = 'datePickerContainer';
    const datePickerIcon = document.createElement('i');
    datePickerIcon.setAttribute('class', 'fas fa-solid fa-calendar');

    const datePicker = createInputElement('date', 'datePicker');
    datePicker.setAttribute('class', 'datePicker');

    datePickContainer.appendChild(datePicker);
    datePickContainer.appendChild(datePickerIcon);

    const lockBtn = document.createElement('i');
    let locked = 'true';
    lockBtn.setAttribute('class', 'fas fa-solid fa-lock');

    // Event listener for the lock button
    lockBtn.addEventListener('click', (e) => {
      const tr = lockBtn.closest('tr');
      const disableDropdown = tr.querySelector('.dropdown-input');
      disableDropdown.disabled = !disableDropdown.disabled;
      applyBtn.disabled = !applyBtn.disabled;
      if (locked) {
        lockBtn.setAttribute('class', 'fas fa-solid fa-lock-open');
        locked = !locked;
      } else {
        lockBtn.setAttribute('class', 'fas fa-solid fa-lock');
        locked = !locked;
      }
      const resetRoutesBtn = document.querySelector('.resetRoutesBtn');
      const inputs = tr.querySelectorAll('input');

      inputs.forEach((input) => {
        input.disabled = !input.disabled;
      });

      const locks = document.querySelectorAll('.fa-lock-open');

      if (e.target.classList.contains('fa-lock-open')) {
        resetRoutesBtn.removeAttribute('disabled', 'disabled');
        return (datePickerIcon.style.color = '#00005e');
      }

      resetRoutesBtn.setAttribute('disabled', 'disabled');
      datePickerIcon.style.color = 'gray';
    });

    // Append elements to the table row
    trBody.appendChild(routeAndColor);
    trBody.appendChild(invoiceNumberBody);
    trBody.appendChild(vehicleBodySelect);
    trBody.appendChild(highwayCostBody);
    inputsBody.appendChild(applyBtn);
    inputsBody.appendChild(datePickContainer);
    inputsBody.appendChild(lockBtn);
    trBody.appendChild(inputsBody);

    // Add the table row to the table
    const tableBody = tbl.appendChild(trBody);
    tableBody.setAttribute('class', 'routesTableBody');
    tableBody.setAttribute('data-row-index', i);

    // Add the table row to the routes tab container
    menuTabBody.appendChild(tableBody);
  }
  loadRoutesFromStorage('.routesTableBody', 'routesData');

  routesReset();
};
