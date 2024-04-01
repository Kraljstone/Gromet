import {directions} from '../../../api/googleMap/directions/directions';
import {GLOBAL_MAP} from '../../../api/googleMap/googleMap';
import { getCoordinates } from '../../../api/googleMap/getCoordinates';
import { calculateTotal } from '../../../utils/calculateTotal';
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

export const ATTRIBUTE_FILTERS_STATE = "attributeFiltersState";
export const checkboxLabels = [
    "Prikaži vrednost, kg i gabarit",
    "Prikaži skraćeni naziv kupca",
    "Prikaži radno vreme i datum",
    "Prikaži grad"
]
export const createComboTab = () => {
    const menuTabBody = document.querySelector('.menu-tab-body');

    //checkbox container
    const divAttributeFiltersContainer = document.createElement('div');
    divAttributeFiltersContainer.className = 'divComboCheckboxContainer';

    let comboAttributeFiltersState = readSavedState();

    checkboxLabels.forEach((text, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = "inputAttributeFilter";
        checkbox.dataset.index = index;
        checkbox.dataset.text = text;
        checkbox.checked = comboAttributeFiltersState && comboAttributeFiltersState.includes(index);
        checkbox.addEventListener('click', (event) => {
            const isChecked = event.target?.checked === true;
            if(isChecked){
                comboAttributeFiltersState.push(Number(checkbox.dataset.index));
            }else{
                comboAttributeFiltersState = comboAttributeFiltersState.filter(el => el !== index);
            }
            localStorage.setItem(ATTRIBUTE_FILTERS_STATE, comboAttributeFiltersState);
            redrawMenuTabBodyElemets(menuTabBody);
        })

        const label = document.createTextNode(text);
        const labelElement = document.createElement('label');
        labelElement.className = "labelAttributeFilterText";
        labelElement.appendChild(checkbox);
        labelElement.appendChild(label);

        divAttributeFiltersContainer.appendChild(labelElement);
    })

    menuTabBody.appendChild(divAttributeFiltersContainer);
    // pins container
    const pinsContainer = createComboPinsContainer();
    menuTabBody.appendChild(pinsContainer);
    // finalize route combo container
   const divFinalContainer = createRouteDataTable();
    menuTabBody.appendChild(divFinalContainer);

};

const readSavedState = () => {
    let readState =  localStorage.getItem(ATTRIBUTE_FILTERS_STATE);
    if(readState && readState.length > 0){
        readState = readState.split(',').map(el => Number(el));
    }
    return readState ? readState : [];
}

const createComboPinsContainer = () => {
    const pinsContainer = document.createElement('div');
    pinsContainer.className = "divPinsContainer";

    const mapLocations = JSON.parse(localStorage.getItem('mapLocations'));
    const routesData = JSON.parse(localStorage.getItem('routesData'));

    if(mapLocations && typeof mapLocations === typeof []){
        // wrap into array 
        const data = Array.from(mapLocations);

        data.forEach((locationInfo) => {
            const rowItem = document.createElement('div');
            rowItem.className = "divRowItem";

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = "checkboxSelectMapLocation";
            const invoiceId = locationInfo['RB naloga'];
            checkbox.dataset.id = invoiceId;
            checkbox.addEventListener('click', (ev) => {
                const target = ev.target;
                const id =  target.dataset?.id;
                // const parent = target.parentNode.parentNode;
                const checkboxes = document.querySelectorAll(".checkboxSelectMapLocation");
                if(checkboxes){

                    const selected = Array.from(checkboxes).filter(checkbox => checkbox.checked === true && !checkbox.disabled).map(el => el.dataset.id);
                    console.log("checkboxSelectMapLocation", checkboxes, selected);
                    const routeLocationsInput = document.querySelector(".inputOdabraninalozi");
                    if(routeLocationsInput && id){
                        const array = routeLocationsInput.value.split(',').filter(el => el.length !== 0);
                        console.log("array", array, id);
                        if(target.checked){
                            array.push(id);
                            routeLocationsInput.value = array.toString();
                        }else{
                            routeLocationsInput.value = array.filter(el => el !== id).toString();
                        }
                    }
                }
            })
            // console.log("first", routesData, locationInfo);
            if(routesData && typeof routesData === typeof [] && invoiceId !== '0'){
                const isAlreadyInARoute = Array.from(routesData).some(route => route.locationMapping.split(",").includes(invoiceId));
                if(isAlreadyInARoute){
                    checkbox.checked = isAlreadyInARoute;
                    checkbox.disabled = isAlreadyInARoute;
                    rowItem.classList.add('rowItemDisabled');
                }
            }

            // const pinGlyph = new google.maps.marker.PinElement({
            //     glyph: locationInfo['RB naloga'],
            //     glyphColor: 'white',
            //     background:  'red'
            // });

            const divInvoiceNum = document.createElement('div');
            divInvoiceNum.className = "divInvoiceNum";
            divInvoiceNum.innerHTML = invoiceId;

            // console.log(pinGlyph ,"ee")

            const label = document.createElement('label');
            label.className = 'labelRowItem';

            const comboAttributeFiltersState = readSavedState();
            const showFirst = comboAttributeFiltersState && comboAttributeFiltersState.includes(0);
            const showSecond = comboAttributeFiltersState && comboAttributeFiltersState.includes(1);
            const showThird = comboAttributeFiltersState && comboAttributeFiltersState.includes(2);
            const showFourth = comboAttributeFiltersState && comboAttributeFiltersState.includes(3);
            if(showFirst){
                label.innerHTML = `${locationInfo['Vrednost naloga']},
                 ${locationInfo['Težina_kg']},
                 ${locationInfo['Gabarit_m3']},`
            }

            label.innerHTML += ` ${locationInfo['Adresa']}`;
            if(showSecond){
                const shortenBuyer = String(locationInfo['Naziv kupca'])?.split(" ")[0];
                console.log("short buyer", shortenBuyer);
                label.innerHTML += ` ${shortenBuyer}`;
            }

            if(showThird){
                const workHours = locationInfo['Radno_vreme'];
                const date = locationInfo['Datum_naloga'];
                label.innerHTML += ` ${workHours}, ${date}`;
            }

            if(showFourth){
                const city = locationInfo['Mesto'];
                label.innerHTML += ` ${city}`;
            }

            rowItem.appendChild(divInvoiceNum);
            rowItem.appendChild(checkbox);
            // rowItem.appendChild(pinGlyph);
            rowItem.appendChild(label);
            pinsContainer.appendChild(rowItem);

        })
    }

    return pinsContainer;
} 

const redrawMenuTabBodyElemets = (menuTabBody) => {
    const pinsContainer = createComboPinsContainer();
    const divRouteDataContainer = createRouteDataTable();
    menuTabBody.removeChild(document.querySelector('.divPinsContainer'));
    menuTabBody.removeChild(document.querySelector('.divRouteConfirmationContainer'));
    console.log("uklonjen", menuTabBody)
    setTimeout(() => {
        menuTabBody.appendChild(pinsContainer);
        menuTabBody.appendChild(divRouteDataContainer);
    }, 300);

}

const createRouteDataTable = () => {
    const divFinalContainer = document.createElement('div');
    divFinalContainer.className = 'divRouteConfirmationContainer';

    // Create table
    const tableRouteData = document.createElement('table');
    tableRouteData.className = 'tableComboRouteData';


    // Create table header
    const headerTitles = ["Naziv rute", "Vozilo", "Unesi putarinu", "Odabrani nalozi"];
    const headerRow = document.createElement("tr");
    tableRouteData.appendChild(headerRow);
    headerTitles.forEach(function (title) {
        const th = document.createElement("th");
        th.textContent = title;
        th.className = `tableHeader${title.replace(" ", "")}`;
        headerRow.appendChild(th);
    });

    // Create table row with inputs
    const inputTypes = ["text", "select", "number", "text"];
    const inputRow = document.createElement("tr");
    tableRouteData.appendChild(inputRow);
    inputTypes.forEach(function (type, index) {
        const td = document.createElement("td");
        const input = document.createElement( index === 1 ? "select": "input");
        input.className = `input${headerTitles[index]?.replace(" ", "")}`
        if(index !== 1){
            input.type = type;
        }
        if(index === 1){
            const savedVehicles = localStorage.getItem("vehiclesData");
            if(savedVehicles){
                const vehiclesData = JSON.parse(savedVehicles);
                vehiclesData.forEach(vehicle => {
                    const opt1 = document.createElement("option");
                    opt1.value = vehicle.vehicle;
                    opt1.text = vehicle.vehicle;
                    input.add(opt1);
                });
            }
        }
        if(index === 3){
            input.disabled = true;
        }
        td.appendChild(input);
        inputRow.appendChild(td);
    });


    const createAditionalRows = (criteria, routeVehicleName) => {
        const criteriaData = {
            profitabilityPercentage: criteria.profitabilityPercentage,
            valueToProfitability: criteria.valueToProfitability,
            weight: criteria.weight,
            gauge: criteria.gauge,
            km: criteria.km,
            routePriorities: criteria.routePriorities,
            profitabilityRatio: criteria.profitabilityRatio
        }
        // Create additional row with text labels
        const additionalRow = document.createElement("tr");
        const td = document.createElement("td");
        td.colSpan = 4; // Span the entire row
        td.style.textAlign = "justify"; // Justify the text evenly
        const labels = [
            "Kriterijumi",
            criteriaData.profitabilityPercentage +"%", 
            criteriaData.valueToProfitability, 
            criteriaData.weight +"kg",
            criteriaData.gauge +"m3" 
        ];
        labels.forEach(function (label) {
            const span = document.createElement("span");
            span.textContent = label;
            span.style.display = "inline-block";
            span.style.width = "20%"; // Even distribution
            td.appendChild(span);
        });
        additionalRow.appendChild(td);

        // Create another additional row with text labels
        const additionalRow2 = document.createElement("tr");

        const td2 = document.createElement("td");
        td2.colSpan = 4; // Span the entire row
        td2.style.textAlign = "justify"; // Justify the text evenly
        const labels2 = [
            "Info", 
            criteriaData.km, 
            criteriaData.routePriorities, 
            criteriaData.profitabilityRatio];
        labels2.forEach(function (label) {
            const span2 = document.createElement("span");
            span2.textContent = label;
            span2.style.display = "inline-block";
            span2.style.width = "20%"; // Even distribution
            td2.appendChild(span2);
        });
        additionalRow2.appendChild(td2);


        const PASSED_3_CRITERIA_GREEN = '#64e100';
        const PASSED_2_CRITERIA_ORANGE = '#FFA500';
        const FAILED_ONE_CRITERIA_RED = '#ff1400';
      
        const storedVehicles = JSON.parse(localStorage.getItem('vehiclesData'));
        const routeVehicle = storedVehicles.find((storedVehicle) =>
          storedVehicle?.vehicle?.includes(routeVehicleName)
        );
        const cardShouldBeGreen =
        criteriaData.weight <= +routeVehicle?.kg &&
        criteriaData.gauge <= +routeVehicle?.m3 &&
        criteriaData.profitabilityRatio <= 2;
      
        const cardShouldBeOrange =
          (criteriaData.weight <= +routeVehicle?.kg && criteriaData.gauge  <= +routeVehicle?.m3) ||
          (criteriaData.weight <= +routeVehicle?.kg && criteriaData.profitabilityRatio <= 2) ||
          (criteriaData.gauge <= +routeVehicle?.m3 && criteriaData.profitabilityRatio <= 2);
      
        const cardBackgroundColor = cardShouldBeGreen
          ? PASSED_3_CRITERIA_GREEN
          : cardShouldBeOrange
          ? PASSED_2_CRITERIA_ORANGE
          : FAILED_ONE_CRITERIA_RED;

          additionalRow.style.backgroundColor = cardBackgroundColor;
          additionalRow2.style.backgroundColor = cardBackgroundColor;
        return [additionalRow, additionalRow2];
    }

    // Create buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = 'divButtonsContainer';


    // Create "Kreiraj rutu" button
    const kreirajButton = document.createElement("button");
    kreirajButton.textContent = "Kreiraj rutu";
    // buttonsContainer.appendChild(kreirajButton);

    // Create "Primeni" button
    const primeniButton = document.createElement("button");
    primeniButton.textContent = "Primeni";

    // Create "Kreiraj rutu" button
    const kreirajRutuButton = document.createElement("button");
    kreirajRutuButton.textContent = "Kreiraj rutu";
    kreirajButton.className = "buttonComboCreateRoute";
    kreirajButton.disabled = true;

    
    const evaluateCriteria = (locationMapping, distance, selectedField, highwayCost) => {
        const storedVehicles = JSON.parse(localStorage.getItem('vehiclesData'));
        const mapLocationData = JSON.parse(localStorage.getItem('mapLocations'));
        const startingPin = locationMapping.split(',');
        const filteredAddresses = mapLocationData.filter((data) => {
          return startingPin.includes(data['RB naloga']);
        });

        const invoiceValueSum = () => {
            let totalValue = 0;
            filteredAddresses.forEach((invoiceValue) => {
              totalValue += +invoiceValue['Vrednost naloga'];
            });
            return totalValue;
          };
         
          const routeVehicle = storedVehicles.find((storedVehicle) =>
            storedVehicle?.vehicle?.includes(selectedField)
          );
          const vehicleCost = +routeVehicle?.cost;
          const routeCost = Math.round(distance) * vehicleCost + +highwayCost;
          const routeInvoiceSum = invoiceValueSum();
          console.log("routeInvoiceSum:", routeInvoiceSum);
          const profitabilityPercentage = Math.trunc(
            (routeInvoiceSum / (routeCost / 0.02)) * 100
          );
          const valueToProfitability = Math.trunc(
            routeInvoiceSum - routeCost / 0.02
          ).toLocaleString('en-GB');  
          const profitabilityRatio = (routeCost / routeInvoiceSum) * 100;
        
          const routePriorities = filteredAddresses.filter(
            (priority) => priority.Prioritet !== '/'
          ).length;
        
          const routeDuration = storedVehicles
            .filter((storedVehicle) => storedVehicle?.vehicle?.includes(selectedField))
            .map((storedVehicle) => {
              const vehicleSpeed = storedVehicle.averageSpeed;
              const routeTimeDuration = distance / vehicleSpeed;
              const hours = Math.floor(routeTimeDuration);
              const minutes = Math.round((routeTimeDuration - hours) * 60);
        
              return { hours, minutes };
            });
        
          const totalRouteLoad = calculateTotal(filteredAddresses, 'Težina_kg');
          const totalGauge = calculateTotal(filteredAddresses, 'Gabarit_m3');

          const criteria = {
            profitabilityPercentage: profitabilityPercentage,
            valueToProfitability: valueToProfitability,
            weight: totalRouteLoad,
            gauge: totalGauge,
            km: `${Math.round(distance)} km`,
            routePriorities: `PR:${routePriorities}`,
            profitabilityRatio:  `${profitabilityRatio.toFixed(2)}`
          }
        return criteria;
    }
    primeniButton.addEventListener('click', async (ev) => {

        const routeName = document.querySelector(".inputNazivrute");
        const routeVehicle = document.querySelector(".inputVozilo");
        const routePayTollCost = document.querySelector(".inputUnesiputarinu");
        const routeSelectedLocations = document.querySelector(".inputOdabraninalozi");

        // evaluateCriteria(routeSelectedLocations, 16);
        let message = "Molim vas unesite:\n";
        let isGood = true;
        if(!routeName?.value){
            message+= " ime rute\n";
            isGood = false;
        }
        if(!routeVehicle?.value){
            message+= " vozilo\n";
            isGood = false;
        }
        if(!routePayTollCost?.value || Number(routePayTollCost?.value) < 0){
            message+= " validnu putarinu\n";
            isGood = false;
        }
        if(!routeSelectedLocations?.value){
            message+= " lokacije\n";
            isGood = false;
        }
        if(!isGood){
            alert(message);
            return;
        }
        const savedRoutes = JSON.parse(localStorage.getItem("routesData"));
        if(savedRoutes){
            const index = savedRoutes.findIndex( route => route.routeName === "");
            if(index === -1) {
                alert("Popunjeno 20 ruta, morate da obrisete neku");
                return;
            }

            const color =  colorPallet[index % colorPallet.length];
            // const map = JSON.parse(localStorage.getItem('map'));

            // calc geo lat lang
            const markerPositions = [];
            const mapLocationData = JSON.parse(localStorage.getItem('mapLocations'));
            for (let i = 0; i < mapLocationData.length; i++) {
              const address = `${mapLocationData[i].Adresa},${mapLocationData[i].Mesto}`;
              const position = await getCoordinates(address);
          
          
              // hasNearbyNeighbourClient(position, maplocationData);
              // { check if x2 - x1 lat and y2 - y1 lang are closer than 2000m then return true and those two should have another colour}
              // distance between 2 points
          
              // ako ima jos neki s tom adresom onda offsetaj position za neki lat/lang
              const hasMultipleInvoices = mapLocationData.map(loc => loc.Adresa).filter(adr => String(mapLocationData[i].Adresa).includes(adr)).length > 1;
              if(hasMultipleInvoices){
                const firstOccuranceIndex = mapLocationData.findIndex(el => el.Adresa === mapLocationData[i].Adresa);
                if(firstOccuranceIndex !== i){
                  const randomIndexBasedNegation = i % 2 === 0 
                  const latOffest = 0.00005 + (i/1000000);
                  if(randomIndexBasedNegation){
                    position.lat += randomIndexBasedNegation ? -latOffest : +latOffest;
                  }else{
                    position.lng += randomIndexBasedNegation ? -latOffest : +latOffest;
                  }
                }
              }
              markerPositions.push(position); 
            }

           const {distance} = await directions(
                GLOBAL_MAP,
                markerPositions,
                routeSelectedLocations.value.split(',').map(Number),
                color
              );
            console.log("distacnce", distance);
            savedRoutes[index] = {
                datePicker: "",
                distance: distance,
                highwayCost: routePayTollCost.value,
                locationMapping: routeSelectedLocations.value,
                randomColor: color,
                routeName: routeName.value,
                selectedField: routeVehicle.value
            }
            console.log(savedRoutes, index, distance);
            localStorage.setItem("tempRoutesData", JSON.stringify(savedRoutes));
            const criteria = evaluateCriteria(routeSelectedLocations?.value, distance, routeVehicle.value, Number(routePayTollCost?.value))
            console.log("Criteria", criteria);
            const aditionalRows = createAditionalRows(criteria, routeVehicle.value);
            const table = document.querySelector('.tableComboRouteData');
            const hasCriteria = table.childNodes.length > 3;
            if(hasCriteria){
                table.removeChild(table.childNodes[3]);
                table.removeChild(table.childNodes[2]);
            }
            tableRouteData.appendChild(aditionalRows[0]);
            tableRouteData.appendChild(aditionalRows[1]);
            // window.location.reload();
            const enableButton = document.querySelector('.buttonComboCreateRoute');
            enableButton.disabled = false;
        }
    })

    kreirajButton.addEventListener('click', () => {
        const savedRoutes = localStorage.getItem("tempRoutesData");
        localStorage.setItem("routesData", savedRoutes);
        window.location.reload();
    })
    buttonsContainer.appendChild(primeniButton);
    buttonsContainer.appendChild(kreirajButton);


   
    divFinalContainer.appendChild(tableRouteData);
    divFinalContainer.appendChild(buttonsContainer);
    return divFinalContainer;
}

