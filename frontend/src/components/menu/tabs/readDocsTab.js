import { uploadFile } from '../../../api/uploadFile';

const menuTabBody = document.querySelector('.menu-tab-body');
import { initMap } from '../../../api/googleMap/googleMap';

export const readDocsTab = () => {
  const fileInput = document.createElement('input');
  fileInput.setAttribute('class', 'fileInput');
  fileInput.type = 'file';

  const handleFileUpload = async () => {
    if (fileInput.files[0]) {
      await uploadFile(fileInput.files[0]);
      await initMap();
    }
  };

  const createFileInput = () => {
    fileInput.addEventListener('change', handleFileUpload);
    return fileInput;
  };

  const createDraggableArea = () => {
    const draggableArea = document.createElement('div');
    draggableArea.setAttribute('class', 'droppable-area');
    draggableArea.addEventListener('drop', handleDrop);
    draggableArea.addEventListener('dragover', handleDragOver);
    draggableArea.innerHTML = 'Drop files here';
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

  menuTabBody.appendChild(createFileInput());
  menuTabBody.appendChild(createDraggableArea());
};
