var mymap = L.map('divMap').setView(
  [21.152364203854884, -101.71115227036523],
  16
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 9,
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(mymap);

var geojson = [
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-101.6824940171719, 21.12574244951028],
    },
    properties: {
      name: 'León',
      title: 'León, Guanajuato',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-101.1748887669979, 21.486437422597927],
    },
    properties: {
      name: 'SFTM',
      title: 'SFTM',
    },
  },
  {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: [-101.37205123901367, 20.529290087784478],
    },
    properties: {
      name: 'PN',
      title: 'Pueblo Nuevo, Guanajuato',
    },
  },
];

coords = [];

var puntos = L.geoJSON(geojson, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng);
  },
  onEachFeature: function (feature, layer) {
    coords.push(feature.geometry.coordinates);
  },
});

mymap.addLayer(puntos);

const pt1 = turf.point(coords[0]);
const pt2 = turf.point(coords[1]);
const pt3 = turf.point(coords[2]);

var options = { units: 'meters' };

var distance = turf.distance(pt1, pt2, options);
//Linea recta entre dos puntos
var line = turf.lineString([coords[0], coords[1]]);
L.geoJSON(line, { color: 'blue' }).addTo(mymap);

var paralela = turf.lineOffset(line, 1, { units: 'miles' });
L.geoJSON(paralela, { color: 'red' }).addTo(mymap);

// Random
var points = turf.randomPoint(5, {
  bbox: [-118.300781, 16.557404, -86.209717, 32.411075],
});

var geoJsonLayer = L.geoJson().addTo(mymap);
geoJsonLayer.addData(points);

// var line = turf.lineString([coords[0], coords[2]]);
// L.geoJSON(line, { color: "red" }).addTo(mymap);

// var line = turf.lineString([coords[1], coords[2]]);
// L.geoJSON(line, { color: "green" }).addTo(mymap);

var features = turf.points(coords);

L.geoJson(statesData, { color: 'pink' }).addTo(mymap);
// var center = turf.center(features);
// console.log(center);
// L.geoJSON(center).addTo(mymap);

// const polygon = turf.polygon([[...coords, coords[0]]]);

// var centroid = turf.centroid(polygon);

// L.geoJSON(polygon, { color: 'red' }).addTo(mymap);

// L.geoJSON(centroid).addTo(mymap);
