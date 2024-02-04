const distanceArr = [];
const colorArr = [];
let lastColor;

const storedData = JSON.parse(localStorage.getItem('routesData'));
storedData?.forEach((savedDistance) => {
  if (savedDistance.distance) {
    distanceArr.push(savedDistance.distance);
  }

  if (savedDistance.randomColor) {
    if (savedDistance.randomColor !== lastColor) {
      colorArr.push(savedDistance.randomColor);
      lastColor = savedDistance.randomColor;
    }
  }
});

export const saveRoutesToStorage = (
  selector,
  storageKey,
  distance,
  color,
  indexRow
) => {
  if (color !== lastColor) {
    colorArr.push(color);
    lastColor = color;
  }
  distanceArr[indexRow] = distance;
  
  const routes = [];
  const rows = document.querySelectorAll(selector);

  rows.forEach((row, index) => {
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

    if (data['routeName'] !== '') {
      // Correct the assignment of distance and color
      data['distance'] = distanceArr[index] || distance;
      data['randomColor'] = colorArr[index] || color;
    }

    routes.push(data);
  });

  localStorage.setItem(storageKey, JSON.stringify(routes));
};

export const loadRoutesFromStorage = (selector, storageKey) => {
  const storedData = localStorage.getItem(storageKey);

  if (storedData) {
    const routes = JSON.parse(storedData);

    const rows = document.querySelectorAll(selector);

    rows.forEach((row, rowIndex) => {
      const inputs = row.querySelectorAll('input[name], select[name]');
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
        if (
          inputName === 'selectedField' &&
          inputData === '' &&
          input.nodeName.toLowerCase() === 'select'
        ) {
          input.value = input.options[0].value;
        }
      });
    });
  }
};
