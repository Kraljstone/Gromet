export const routesHead = () => {
  const menuTabBody = document.querySelector('.menu-tab-body');
  const tbl = document.createElement('table');

  // Function to create table header cell
  const createTableHeader = (text) => {
    const th = document.createElement('th');
    th.innerHTML = text;
    return th;
  };

  // Create table header row
  const trHeading = document.createElement('tr');
  trHeading.appendChild(createTableHeader('Naziv rute'));
  trHeading.appendChild(createTableHeader('Unesi broj naloga'));
  trHeading.appendChild(createTableHeader('Vozilo'));
  trHeading.appendChild(createTableHeader('Unesi putarinu'));
  trHeading.appendChild(createTableHeader(''));

  // Add the table header row to the table
  const tableHeading = tbl.appendChild(trHeading);
  tableHeading.setAttribute('class', 'routesTable');
  menuTabBody.appendChild(tableHeading);
};
