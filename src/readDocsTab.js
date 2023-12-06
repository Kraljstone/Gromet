export const readDocsTab = () => {
  const menuTabBody = document.querySelector('.menu-tab-body');

  const createFileInput = () => {
    const fileInput = document.createElement('input');
    fileInput.setAttribute('id', 'fileInput');
    fileInput.type = 'file';
    fileInput.addEventListener('change', handleFileUpload);
    return fileInput;
  };

  const createDraggableArea = () => {
    const draggableArea = document.createElement('div');
    draggableArea.setAttribute('id', 'droppable-area');
    draggableArea.addEventListener('drop', handleDrop);
    draggableArea.addEventListener('dragover', handleDragOver);
    draggableArea.innerHTML = 'Drop files here';
    return draggableArea;
  };

  const handleFileUpload = async (event) => {
    const fileInput = document.getElementById('fileInput');
    const file = fileInput.files[0];

    if (file) {
      await uploadFile(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;

    if (files.length > 0) {
      uploadFile(files[0]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:3000/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  menuTabBody.appendChild(createFileInput());
  menuTabBody.appendChild(createDraggableArea());
};
