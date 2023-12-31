export const routesValidation = (tr) => {
  const routeName = tr.querySelector('input[name="routeName"]').value.trim();
  const locationMapping = tr
    .querySelector('input[name="locationMapping"]')
    .value.trim();
  const selectedField = tr.querySelector('select[name="selectedField"]').value;
  const highwayCost = tr
    .querySelector('input[name="highwayCost"]')
    .value.trim();

  if (!routeName) {
    alert('Molimo vas da unesete naziv rute');
    return false;
  }

  if (!locationMapping) {
    alert('Molimo vas da unesete zeljenu rutu');
    return false;
  }

  if (selectedField === 'Odaberi Vozilo') {
    alert('Molimo vas da odaberete vozilo');
    return false;
  }

  return true;
};
