import { generateRandomColor } from '../utils/generateRandomColor';

export const saveRoutesToStorage = (selector, storageKey) => {
  const routes = [];

  const rows = document.querySelectorAll(selector);

  rows.forEach((row) => {
    const inputs = row.querySelectorAll('input[name], select[name]');
    const data = {};

    inputs.forEach((input) => {
      data[input.name] = input.value;
    });

    const selectElement = Array.from(inputs).find(
      (input) => input.nodeName.toLowerCase() === 'select'
    );

    if (selectElement) {
      data[Object.keys(data)[2]] = selectElement.value;
    }

    data['randomColor'] = generateRandomColor();

    routes.push(data);
  });

  localStorage.setItem(storageKey, JSON.stringify(routes));
};

export const loadRoutesFromStorage = (selector, data) => {
  const storedData = localStorage.getItem(data);

  if (storedData) {
    const routes = JSON.parse(storedData);

    const rows = document.querySelectorAll(selector);

    rows.forEach((row, rowIndex) => {
      const inputs = row.querySelectorAll('input[name], select[name]');
      const colorElement = row.querySelector('.pinConnectColor');

      inputs.forEach((input) => {
        const inputName = input.name;
        const inputData = routes?.[rowIndex]?.[inputName];

        // Check if the data for the input exists
        if (inputData !== undefined) {
          // Handle select elements separately
          if (input.nodeName.toLowerCase() === 'select') {
            // Ensure the option exists before setting the value
            if (
              [...input.options].some((option) => option.value === inputData)
            ) {
              input.value = inputData;
            }
          } else {
            input.value = inputData;
          }
        }
      });

      // Check if color data exists and set the color element content
      const colorData = routes?.[rowIndex]?.randomColor;
      if (colorData !== undefined) {
        colorElement.style.backgroundColor = colorData;
      }
    });
  }
};
