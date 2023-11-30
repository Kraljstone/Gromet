export const readDocsTab = () => {
  const menuTabBody = document.querySelector('.menu-tab-body');
  const inputElement = document.createElement('input');
  inputElement.type = 'file';

  menuTabBody.appendChild(inputElement);

  const handleDrop = (event) => {
    event.preventDefault();

    const files = event.dataTransfer.files;

    for (const file of files) {
      console.log('Dropped file:', file.name);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const draggableInput = document.createElement('div');
  draggableInput.setAttribute('id', 'droppable-area');
  draggableInput.addEventListener('drop', handleDrop);
  draggableInput.addEventListener('dragover', handleDragOver);
  draggableInput.innerHTML = 'Drag your file here';

  menuTabBody.appendChild(draggableInput);
};
