import config from '../../config';
export async function fetchDataAndDownloadExcel(routesData) {
  const endpoint = config.API_BASE_URL + '/api/download';

  try {
    const jsonData = routesData;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add other headers as needed
      },
      body: JSON.stringify(jsonData),
    });

    if (response.ok) {
      // Extract Excel file blob from the response
      const excelBlob = await response.blob();

      // Create a blob URL for the Excel file
      const excelBlobUrl = URL.createObjectURL(excelBlob);

      // Create a link element
      const link = document.createElement('a');

      // Set link properties
      link.href = excelBlobUrl;
      link.download = 'output.xlsx'; // Specify the desired filename

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger a click on the link to initiate the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    } else {
      console.error(
        'Server returned an error:',
        response.status,
        response.statusText
      );
    }
  } catch (error) {
    // Handle any other errors that may occur during the fetch process
    console.error('An error occurred:', error);
  }
}
