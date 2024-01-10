export const navTable = (storedRoutes, storedVehicles) => {
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
        const storedDate = storedRoute.datePicker
          .split('-')
          .reverse()
          .join('-');

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
};

const padZero = (num) => (num < 10 ? `0${num}` : num);

const getCurrentWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const currentHour = today.getHours();
  const startOfWeek = new Date(today);

  if (currentDay === 0 && currentHour >= 0) {
    startOfWeek.setDate(startOfWeek.getDate() + 7);
  }

  startOfWeek.setDate(
    today.getDate() -
      currentDay +
      (currentDay === 1 ? 0 : currentDay === 0 ? -6 : 1)
  );

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
    const day = padZero(currentDate.getDate());
    const month = padZero(currentDate.getMonth() + 1);
    return `${
      daysInSerbian[dayIndex]
    }<br>${day}-${month}-${currentDate.getFullYear()}`;
  });

  return weekDates;
};
