const config = require('../../config');

export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(config.API_BASE_URL+'/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log("result is:", result);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};