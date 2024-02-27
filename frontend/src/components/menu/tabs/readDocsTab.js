import { uploadFile } from '../../../api/uploadFile';

const menuTabBody = document.querySelector('.menu-tab-body');
import { initMap } from '../../../api/googleMap/googleMap';

export const readDocsTab = () => {
  const fileInput = document.createElement('input');
  fileInput.setAttribute('class', 'fileInput');
  fileInput.type = 'file';
  fileInput.setAttribute('id', 'btnFileUpload');
  fileInput.style.display = 'none';

  const parseUploadResult = (mapLocations, fileName) => {
    const label = document.querySelector('.labelForFileInput');
    if(label){
      const mapLocationData = mapLocations;
      label.innerHTML =  `<p class='pCurrentFile'>Trenutno učitan: ${fileName} </p>`;
      label.innerHTML +=   mapLocationData ? 
                `<p class='pCurrentFile'>Broj ucitanih naloga: ${mapLocationData?.length} </p>`
                : `<p class='pCurrentFileFailed'>Nema ucitanih naloga / doslo je do greske prilikom ucitavanja </p>`;

      const multipleInvoices = [] ;
      const passedIds = [];
      mapLocationData.forEach((element, index) => {
        const additionalInvoices = mapLocationData.filter(location =>  location.Adresa === element.Adresa);
        const alreadyCounted = Array(...passedIds).some(id => additionalInvoices.find(el => el['RB naloga'] === id));
        passedIds.push(element['RB naloga']);

        if(additionalInvoices.length > 1 && !alreadyCounted){
          multipleInvoices.push(additionalInvoices);
        }
      })
      label.innerHTML +=  `<p class='pCurrentFile'>Pinovi sa vise naloga: ${multipleInvoices.map(grp => `[${grp.map(el => `${el['RB naloga']}`)}]`).toString()} </p>`;
    }
  }

  const handleFileUpload = async () => {
    if (fileInput.files[0]) {
      await uploadFile(fileInput.files[0]).then(mapLocations => {
        parseUploadResult(mapLocations, fileInput.files[0].name);
      }).catch(err => alert("greska prilikom ucitavanja fajla", err));
      await initMap();
    }
  };

  const createLabelFileInput = () => {
    const label = document.createElement('label');
    label.setAttribute('for', 'btnFileUpload');
    label.setAttribute('class', 'labelForFileInput');
    label.innerHTML = "Izaberite excel fajl";
    return label;
  }

  const createFileInput = () => {
    fileInput.addEventListener('change', handleFileUpload);
    return fileInput;
  };

  const createDraggableArea = () => {
    const draggableArea = document.createElement('div');
    draggableArea.setAttribute('class', 'droppable-area');
    draggableArea.addEventListener('drop', handleDrop);
    draggableArea.addEventListener('dragover', handleDragOver);
    draggableArea.innerHTML = 'Prevucite excel ovde';
    return draggableArea;
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    if (files.length > 0) {
      await uploadFile(files[0]).then(mapLocations => {
        parseUploadResult(mapLocations, files[0].name);
      });
      await initMap();
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  menuTabBody.appendChild(createLabelFileInput());
  menuTabBody.appendChild(createFileInput());
  menuTabBody.appendChild(createDraggableArea());
};
