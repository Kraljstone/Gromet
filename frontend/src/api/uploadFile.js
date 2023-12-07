export const uploadFile = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
};
