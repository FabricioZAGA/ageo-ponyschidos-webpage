const leafletMap = L.map('divMap').setView(
  [21.182084609059913, -101.71251643449067],
  17
);

var lastCoordenates = '';
var lastLine;
leafletMap.clicked = 0;

leafletMap.doubleClickZoom.disable();

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(leafletMap);

const onMapSingleClick = (e) => {
  leafletMap.clicked = leafletMap.clicked + 1;
  setTimeout(function () {
    if (leafletMap.clicked == 1) {
      L.marker(e.latlng)
        .addTo(leafletMap)
        .bindPopup(`Marcador añadido por coordenadas ${e.latlng}`);
      lastCoordenates = e.latlng;
      leafletMap.clicked = 0;
    }
  }, 300);
};

const onMapDoubleClick = (e) => {
  leafletMap.clicked = 0;
  if (lastCoordenates !== '') {
    if (lastLine) leafletMap.removeLayer(lastLine);

    L.marker(e.latlng)
      .addTo(leafletMap)
      .bindPopup(`Marcador añadido por coordenadas punto final ${e.latlng}`);

    lastLine = L.polyline([lastCoordenates, e.latlng], {
      color: 'red',
      weight: 3,
      opacity: 0.5,
      smoothFactor: 1,
    }).addTo(leafletMap);

    lastCoordenates = '';
  }
};

leafletMap.on('dblclick', onMapDoubleClick);
leafletMap.on('click', onMapSingleClick);
