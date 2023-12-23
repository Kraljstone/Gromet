const getCurrentWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDay + (currentDay === 1 ? 0 : -6));

  // Ensure that the starting day is within the desired range (18th to 24th)
  startOfWeek.setDate(startOfWeek.getDate() < 18 ? 18 : startOfWeek.getDate());

  const daysInSerbian = ['Nedelja', 'Ponedeljak', 'Utorak', 'Sreda', 'Četvrtak', 'Petak', 'Subota'];

  const weekDates = Array.from({ length: 7 }, (_, i) => {
    const currentDate = new Date(startOfWeek);
    currentDate.setDate(startOfWeek.getDate() + i);
    const dayIndex = currentDate.getDay();
    return `${daysInSerbian[dayIndex]}<br>${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;
  });

  return weekDates;
};

export function navTable() {
  const nav = document.querySelector('.nav-btn-container');
  const storedVehicles = JSON.parse(localStorage.getItem('vehiclesData')) || [];
  const storedRoutes = JSON.parse(localStorage.getItem('routesData')) || [];

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
      const route = storedRoutes.find((r) => {
        const storedDate = r.datePicker.split('-').reverse().join('-');
        return storedDate === transformedLocalDate && r.selectedField === vehicle.vehicle;
      });

      const cell = dataRow.insertCell(colIndex + 1);
      cell.innerHTML = route ? route.routeName : '';
      cell.style.backgroundColor = route ? route.randomColor : '';
    });
  });

  nav.appendChild(table);
}
