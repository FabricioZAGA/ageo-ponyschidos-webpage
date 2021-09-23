const leafletMap = L.map('divMap').setView(
  [21.182084609059913, -101.71251643449067],
  17
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(leafletMap);

const _onEachFeature = (feature, layer) => {
  var popupContent = '';
  feature.properties.popupContent
    ? (popupContent = feature.properties.popupContent)
    : (popupContent = `I'am a ${feature.geometry.type}`);

  if (feature.properties.style) layer.setStyle(feature.properties.style);

  layer.bindPopup(popupContent);
};

L.geoJSON(granJardin, {
  filter: (feature, layer) => {
    if (feature.properties) return true;
  },
  onEachFeature: _onEachFeature,
}).addTo(leafletMap);

//NOTES FROM 22/09/2021
const onMapClick = (e) => {
  L.popup()
    .setLatLng(e.latlng)
    .setContent(`You have clicked on: ${e.latlng}`)
    .openOn(leafletMap);
};

leafletMap.on('click', onMapClick);
