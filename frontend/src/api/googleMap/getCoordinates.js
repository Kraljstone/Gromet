import { apiKey } from '../../../../config.json';

// Get the coordinates of the address

export const getCoordinates = async (address) => {
  console.log("Adresa za geolokaciju:", address);
  const geolocationAddress = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${apiKey}`
  )
  const geolocation = await geolocationAddress.json();
  
  if(geolocation?.status !== 'OK'){
    alert("Doslo je do greske prilikom geolokacije: " + geolocation?.status + " za trazenu adresu: " + address);
  }
  const { lat, lng } = geolocation.results[0].geometry.location;
  return { lat, lng };
};
