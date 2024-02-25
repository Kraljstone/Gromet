import { uploadFile } from '../../../api/uploadFile';

const menuTabBody = document.querySelector('.menu-tab-body');
import { initMap } from '../../../api/googleMap/googleMap';

export const readDocsTab = () => {
  const fileInput = document.createElement('input');
  fileInput.setAttribute('class', 'fileInput');
  fileInput.type = 'file';
  fileInput.setAttribute('id', 'btnFileUpload');
  fileInput.style.display = 'none';

  const handleFileUpload = async () => {
    if (fileInput.files[0]) {
      const label = document.querySelector('.labelForFileInput');
      if(label){
        const mapLocationData = JSON.parse(localStorage.getItem('mapLocations'));
        label.innerHTML +=  `<p class='pCurrentFile'>Trenutno učitan: ${fileInput.files[0].name} </p>`;
        label.innerHTML +=  `<p class='pCurrentFile'>Broj ucitanih naloga: ${mapLocationData?.length} </p>`;
        // label.innerHTML +=  `<p class='pCurrentFile'>Broj ucitanih naloga: ${fileInput.files[0].name} </p>`;

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
      await uploadFile(fileInput.files[0]);
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
      await uploadFile(files[0]);
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
