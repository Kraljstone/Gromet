export const routesValidation = (tr) => {
  const routeName = tr.querySelector('input[name="routeName"]').value.trim();
  const locationMapping = tr
    .querySelector('input[name="locationMapping"]')
    .value.trim();
  const selectedField = tr.querySelector('select[name="selectedField"]').value;
  const highwayCost = tr
    .querySelector('input[name="highwayCost"]')
    .value.trim();

  // Basic validation for routeName
  if (!routeName) {
    alert('Molimo vas da unesete naziv rute');
    return;
  }

  // Basic validation for locationMapping
  if (!locationMapping) {
    alert('Molimo vas da unesete zeljenu rutu');
    return;
  }

  // Basic validation for selectedField (vehicle selection)
  if (selectedField === 'Odaberi Vozilo') {
    alert('Molimo vas da odaberete vozilo');
    return;
  }

  // Basic validation for highwayCost
  if (!highwayCost || isNaN(parseFloat(highwayCost))) {
    alert('Molimo vas da unesete vrednost putarine');
    return;
  }
};
