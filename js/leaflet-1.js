const validCoordinates = (lat, lng) => {
  if (
    isFinite(lat) &&
    Math.abs(lat) <= 90 &&
    isFinite(lng) &&
    Math.abs(lng) <= 180
  )
    return true;
  else return false;
};

const addMarker = (lat, lng, title) => {
  if (validCoordinates(lat, lng)) {
    L.marker([lat, lng])
      .addTo(leafletMap)
      .bindPopup(title ? title : 'Marcador añadido por coordenadas');
  } else {
    Swal.fire({
      title: 'Error!',
      text: 'Las coordenadas ingresdas no son válidas',
      icon: 'error',
      confirmButtonText: 'Ok!',
    });
  }
};

const leafletMap = L.map('divMap').setView(
  [21.15223412617155, -101.7113883047542],
  4
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(leafletMap);
