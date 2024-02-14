export const navTable = () => {
  const storedVehicles = JSON.parse(localStorage.getItem('vehiclesData')) || [];
  const storedRoutes = JSON.parse(localStorage.getItem('routesData')) || [];
  const vehicleTab = document.querySelector('.menu-tab-body');
  const table = document.createElement('table');
  table.classList.add('availabilityTable');
  const headerRow = table.insertRow(0);
  headerRow.insertCell(0).innerHTML = 'Rasp.<br/>vozila';
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

  vehicleTab.appendChild(table);
};

const padZero = (num) => (num < 10 ? `0${num}` : num);

const getCurrentWeekDates = () => {
  const today = new Date();
  const currentHour = today.getHours();
  const startOfWeek = new Date(today);

  startOfWeek.setDate(today.getDate());

  if (currentHour === 0) {
    startOfWeek.setDate(startOfWeek.getDate() + 1);
  }
  console.log(startOfWeek)

  const daysInSerbian = ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'];

  const weekDates = Array.from({ length: 14 }, (_, i) => {
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
