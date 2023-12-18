import { clearDirections } from '../../../../api/googleMap/directions/directions';

export const routesReset = () => {
  const menuTabBody = document.querySelector('.menu-tab-body');
  // Create a "Reset All Routes" button
  const resetButtonContainer = document.createElement('div');
  resetButtonContainer.setAttribute('class', 'resetButtonContainer');
  const resetButton = document.createElement('button');
  resetButton.innerHTML = 'Resetuj sve rute';
  resetButton.setAttribute('class', 'resetRoutesBtn');
  resetButton.setAttribute('disabled', 'disabled');
  resetButton.addEventListener('click', () => {
    const rows = document.querySelectorAll('.routesTableBody');

    rows.forEach((row) => {
      const inputs = row.querySelectorAll('input[name], select[name]');

      inputs.forEach((input) => {
        input.value = '';
      });
    });

    localStorage.removeItem('routesData');
    clearDirections();
    const card = document.querySelectorAll('.card');
    card.forEach((card) => (card.style.display = 'none'));
  });

  resetButtonContainer.appendChild(resetButton);
  menuTabBody.appendChild(resetButtonContainer);
};
