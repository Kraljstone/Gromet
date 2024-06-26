import { loadRoutesFromStorage } from '../../../../store/routesStore';
import { routesReset } from './routesReset';
import { routesHead } from './routesHead';
import { directionsRenderers } from '../../../../api/googleMap/directions/directions';
import { fetchDataAndDownloadExcel } from '../../../../utils/fetchDataAndDownloadExcel';
import MCDatepicker from 'mc-datepicker';

const prevState = JSON.parse(localStorage.getItem("routesData"));
const prevVehicleState = JSON.parse(localStorage.getItem("vehiclesData"));
console.log("prevstate",prevVehicleState, prevState, !prevState || !Array.from(prevState).some(el => String(el.routeName).length > 0) )
if(!prevVehicleState || (prevVehicleState && prevVehicleState.length === 0)){
  const newVehicle = 
    '[{"vehicle":"test","kg":"0","m3":"0","cost":"0","averageSpeed":"0","deliveryTime":"0"}]';
    localStorage.setItem("vehiclesData", newVehicle);
}
if(!prevState || !Array.from(prevState).some(el => String(el.routeName).length > 0)){
  // localStorage.setItem("routesData",[{"routeName":"pr1","locationMapping":"0,1","selectedField":"asd","highwayCost":"55","datePicker":"2024-04-08","distance":59.225,"randomColor":"rgb(31, 119, 180)"}]);
  const templateObject = {
    "routeName": "",
    "locationMapping": "",
    "selectedField": "",
    "highwayCost": "",
    "datePicker": "",
    "distance": "",
    "randomColor": ""
};

// Create an array to store the objects
const objectsArray = [];

// Create the first object with provided values
const firstObject = {
    "routeName": "test",
    "locationMapping": "0,1",
    "selectedField": "test",
    "highwayCost": "55",
    "datePicker": "2024-04-08",
    "distance": 59.225,
    "randomColor": "rgb(31, 119, 180)"
};

// Push the first object to the array
objectsArray.push(firstObject);

// Create 19 more objects with empty attributes
for (let i = 1; i < 20; i++) {
    const newObj = {};
    for (let key in templateObject) {
        newObj[key] = "";
    }
    objectsArray.push(newObj);  
}
console.log("obj", objectsArray);
localStorage.setItem("routesData", JSON.stringify(objectsArray));
}


export const createRoutesTab = () => {
  const menuTabBody = document.querySelector('.menu-tab-body');
  const mapLocationData = JSON.parse(localStorage.getItem('mapLocations'));
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
  const colorPallet = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c',
    '#d62728',
    '#9467bd',
    '#8c564b',
    '#e377c2',
    '#7f7f7f',
    '#bcbd22',
    '#17becf',
    '#FF5733',
    '#33FF57',
    '#5733FF',
    '#FF33A8',
    '#FF8C33',
    '#33A8FF',
    '#8C33FF',
    '#33FF8C',
    '#A833FF',
    '#FFA833',
  ];

  for (let i = 0; i < 20; i++) {
    // Create a table row
    const trBody = document.createElement('tr');

    // Create cells for each column
    const routeAndColor = document.createElement('div');
    routeAndColor.setAttribute('class', 'routeAndColor');
    const routeName = createInputElement('text', 'routeName');
    const color = document.createElement('p');
    color.innerHTML = 'a';
    color.setAttribute('class', 'pinConnectColor');
    color.style.backgroundColor = colorPallet[i % colorPallet.length];

    routeAndColor.appendChild(routeName);
    routeAndColor.appendChild(color);
    const locationMapping = createInputElement('text', 'locationMapping');
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

    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('gg-trash');
    deleteBtn.style.color = 'gray';

    deleteBtn.addEventListener('click', (e) => {
      const isConfirmed = window.confirm(
        'Da li ste sigurni da zelite da obrisete rutu?'
      );

      if (isConfirmed) {
        if (
          e.target.parentElement.children[2].classList.contains('fa-lock-open')
        ) {
          const targetValue =
            e.target.parentElement.parentElement.firstChild.firstChild.value;
          let routesData = JSON.parse(localStorage.getItem('routesData'));

          if (routesData && Array.isArray(routesData)) {
            const index = routesData.findIndex(
              (routeInfo) => routeInfo.routeName === targetValue
            );

            if (index !== -1) {
              if (directionsRenderers[index]) {
                directionsRenderers[index].setDirections({ routes: [] });
              }

              routesData[index] = Object.fromEntries(
                Object.keys(routesData[index]).map((key) => [key, ''])
              );
              const isSortingNeeded = routesData[index + 1] && routesData[index + 1]?.routeName?.length > 1;
              if(isSortingNeeded){
                const sortingCondition =  (a, b) => {
                  if (a.routeName === "" && b.routeName !== "") {
                      return 1; // Move a to end
                  } else if (a.routeName !== "" && b.routeName === "") {
                      return -1; // Move b to end
                  } else {
                      return 0; // Maintain relative order
                  }
                }
                routesData.sort(sortingCondition);
                routesData.forEach((route, index) => route.randomColor = colorPallet[index])
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
              localStorage.setItem('routesData', JSON.stringify(routesData));
            }
          }

          const cards = document.querySelectorAll('.card');
          cards.forEach((card) => {
            if (card.firstChild.innerHTML === targetValue) {
              card.parentNode.removeChild(card);
            }
          });

          loadRoutesFromStorage('.routesTableBody', 'routesData');
        }
      }
    });

    const info = document.createElement('i');
    info.classList.add('fas', 'fa-info');
    info.classList.add('info');

    const print = document.createElement('i');
    print.classList.add('fas', 'fa-print');
    print.classList.add('print');
    print.addEventListener('click', (e) => {
      const target = e.target.parentElement.parentElement.children[1].value;
      const pins = target.split(',').map((part) => parseInt(part) + 1);
      const newMapLocationData = mapLocationData.filter((data) => {
        const rbNalogValue = +data['RB naloga'];
        return pins.includes(rbNalogValue);
      });
      fetchDataAndDownloadExcel(newMapLocationData);
    });

    const datePickContainer = document.createElement('div');
    datePickContainer.classList = 'datePickerContainer';
    const datePickerInput = createInputElement('text', 'datePicker');
    datePickerInput.setAttribute('class', 'datePicker');
    datePickerInput.id = "datepicker"+i;
    datePickerInput.dataset.routeIndex = i;
    const datePickerIcon = document.createElement('i');
    datePickerIcon.setAttribute('class', 'fas fa-solid fa-calendar');
    datePickerIcon.id = "datepickerIcon"+i;

    const picker = MCDatepicker.create({
      el: '#datepicker'+i,
      dateFormat: "yyyy-mm-dd"
    });

    const savedRoutes = localStorage.getItem("routesData");  
    datePickerIcon.addEventListener('click', (ev) => picker.open());
    datePickerInput.addEventListener('click', (ev) => picker.open());
    picker.onSelect((date, formatedDate) => 
    {
      console.log('Selected date: ' + date, formatedDate);
      datePickerInput.value = formatedDate;
      datePickerInput.style.zIndex = 10;
      const routeIndex = datePickerInput.dataset.routeIndex;
      
      const datePickerIcon = document.querySelector("#datepickerIcon"+routeIndex);
      if(datePickerIcon){
        datePickContainer.removeChild(datePickerIcon);
      }
      if(savedRoutes){
        const arr = JSON.parse(savedRoutes);
        arr[routeIndex].datePicker = formatedDate;
        // localStorage.setItem("routesData", JSON.stringify(arr));
      }
    });


    datePickContainer.appendChild(datePickerInput);
 
    if(savedRoutes){
      const arr = JSON.parse(savedRoutes);
      const isFilled = arr[i]?.datePicker?.length > 0;
      if(!isFilled)
        datePickContainer.appendChild(datePickerIcon);
    }

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

      if (e.target.classList.contains('fa-lock-open')) {
        resetRoutesBtn.removeAttribute('disabled', 'disabled');
        deleteBtn.style.color = '#00005e';
        return (datePickerIcon.style.color = '#00005e');
      }

      resetRoutesBtn.setAttribute('disabled', 'disabled');
      datePickerIcon.style.color = 'gray';
      deleteBtn.style.color = 'gray';
    });

    // Append elements to the table row
    trBody.appendChild(routeAndColor);
    trBody.appendChild(locationMapping);
    trBody.appendChild(vehicleBodySelect);
    trBody.appendChild(highwayCostBody);
    inputsBody.appendChild(applyBtn);
    inputsBody.appendChild(datePickContainer);
    inputsBody.appendChild(lockBtn);
    inputsBody.appendChild(deleteBtn);
    inputsBody.appendChild(info);
    inputsBody.appendChild(print);
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

