export function getInfoWindowContent(data, distance) {
  console.log(distance);
  // Customize the content of the InfoWindow here
  return `
    <div>
      ${data['NAZIV FIRME']}<br>
      ${data['RADNO VREME']}<br>
      Distance: ${distance} km
    </div>
  `;
}
