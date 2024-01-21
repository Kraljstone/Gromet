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
    const bigCard = document.querySelectorAll('.bigCard');
    const availabilityTable = document.querySelector('.availabilityTable');
    card.forEach((card) => (card.style.display = 'none'));
    bigCard.forEach((bigCard) => (bigCard.style.display = 'none'));
    availabilityTable?.remove();
    const navBtn = document.querySelector('.nav-btn-container');
    const nav = document.querySelector('.nav');
    navBtn.style.height = 'auto';
    nav.style.height = 'auto';
  });

  resetButtonContainer.appendChild(resetButton);
  menuTabBody.appendChild(resetButtonContainer);
};
