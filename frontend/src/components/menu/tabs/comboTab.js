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
            const invoiceId = locationInfo['RB naloga'];
            if(typeof routesData === typeof [] && invoiceId !== '0'){
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

createRouteDataTable = () => {
    const divFinalContainer = document.createElement('div');
    divFinalContainer.className = 'divRouteConfirmationContainer';

    // Create table
    const tableRouteData = document.createElement('table');


    // Create table header
    const headerTitles = ["Naziv rute", "Vozilo", "Unesi putarinu", "Odabrani nalozi"];
    const headerRow = document.createElement("tr");
    tableRouteData.appendChild(headerRow);
    headerTitles.forEach(function (title) {
        const th = document.createElement("th");
        th.textContent = title;
        headerRow.appendChild(th);
    });

    // Create table row with inputs
    const inputTypes = ["text", "select", "number", "text"];
    const inputRow = document.createElement("tr");
    tableRouteData.appendChild(inputRow);
    inputTypes.forEach(function (type) {
        const td = document.createElement("td");
        const input = document.createElement("input");
        input.type = type;
        td.appendChild(input);
        inputRow.appendChild(td);
    });


    // Create additional row with text labels
    const additionalRow = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 4; // Span the entire row
    td.style.textAlign = "justify"; // Justify the text evenly
    const labels = ["Kriterijumi", "120%", "240000", "6560kg", "15m3"];
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
    const labels2 = ["Info", "132km", "Pr:4", "0.39"];
    labels2.forEach(function (label) {
        const span2 = document.createElement("span");
        span2.textContent = label;
        span2.style.display = "inline-block";
        span2.style.width = "20%"; // Even distribution
        td2.appendChild(span2);
    });
    additionalRow2.appendChild(td2);


    // Create buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = 'divButtonsContainer';


    // Create "Kreiraj rutu" button
    const kreirajButton = document.createElement("button");
    kreirajButton.textContent = "Kreiraj rutu";
    buttonsContainer.appendChild(kreirajButton);

    // Create "Primeni" button
    const primeniButton = document.createElement("button");
    primeniButton.textContent = "Primeni";
    buttonsContainer.appendChild(primeniButton);


    tableRouteData.appendChild(additionalRow);
    tableRouteData.appendChild(additionalRow2);
    divFinalContainer.appendChild(tableRouteData);
    divFinalContainer.appendChild(buttonsContainer);
    return divFinalContainer;
}