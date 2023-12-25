export function navTable(storedRoutes, storedVehicles) {
  const nav = document.querySelector('.nav-btn-container');
  const table = document.createElement('table');
  table.classList.add('availabilityTable');
  const headerRow = table.insertRow(0);
  headerRow.insertCell(0).innerHTML = 'Raspoloživost vozila';

  const weekDates = getCurrentWeekDates();
  weekDates.forEach((date, i) => {
    headerRow.insertCell(i + 1).innerHTML = date;
  });

  storedVehicles.forEach((vehicle, rowIndex) => {
    const dataRow = table.insertRow(rowIndex + 1);
    dataRow.insertCell(0).innerHTML = vehicle.vehicle || '';

    weekDates.forEach((date, colIndex) => {
      const transformedLocalDate = date.slice(-10);
      const route = storedRoutes.find((storedRoute) => {
        const storedDate = storedRoute.datePicker.split('-').reverse().join('-');
        return (
          storedDate === transformedLocalDate &&
          storedRoute.selectedField === vehicle.vehicle
        );
      });

      const cell = dataRow.insertCell(colIndex + 1);
      cell.innerHTML = route ? route.routeName : '';
    });
  });

  nav.appendChild(table);
}
const getCurrentWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(
    today.getDate() - currentDay + (currentDay === 1 ? 0 : -6)
  );

  startOfWeek.setDate(startOfWeek.getDate() < 18 ? 18 : startOfWeek.getDate());

  const daysInSerbian = [
    'Nedelja',
    'Ponedeljak',
    'Utorak',
    'Sreda',
    'Četvrtak',
    'Petak',
    'Subota',
  ];

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    const dayIndex = currentDate.getDay();
    return `${daysInSerbian[dayIndex]}<br>${currentDate.getDate()}-${
      currentDate.getMonth() + 1
    }-${currentDate.getFullYear()}`;
  });

  return weekDates;
};
