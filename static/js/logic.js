// var newYorkCoords = [40.73, -74.0059];
// var mapZoomLevel = 12;

var url = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json"

d3.json(url).then((response) => {
  console.log(response);

  createMap(response);

});

// Create the createMap function.
function createMap(response) {
  // Pull the "stations" property from response.data.
  let bikeData = response.data.stations;

  // Create the tile layer that will be the background of our map.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })


  // Create a baseMaps object to hold the lightmap layer.

  var baseMap = {
    "Street map": street
  };

  // Create an overlayMaps object to hold the bikeStations layer.

  var overlayMap = {
    "Bike Stations": createMarker(bikeData)

  };

  // Create the map object with options.
  var myMap = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [street, createMarker(bikeData)]
  });

  // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.

  L.control.layers(baseMap, overlayMap, {
    collapse: false
  }).addTo(myMap);

};


// Create the createMarkers function.

function createMarker(bikeData) {

  // Initialize an array to hold the bike markers.

  bikeMarkers = [];

  // Loop through the stations array.
  // For each station, create a marker, and bind a popup with the station's name.
  // Add the marker to the bikeMarkers array.

  for (var i = 0; i < bikeData.length; i++) {

    bikeMarkers.push(L.marker([bikeData[i].lat, bikeData[i].lon])
      .bindPopup(`<h3>${bikeData[i].name}</h3> <hr> <h4> Capacity: ${bikeData[i].capacity}</h4>`)
    );
  }

  // Create a layer group that's made from the bike markers array, and pass it to the createMap function.

  var bikeStationsLayer = L.layerGroup(bikeMarkers);

  return bikeStationsLayer;

}


// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes.

// Advanced version

var url = "https://gbfs.citibikenyc.com/gbfs/en/station_status.json"

d3.json(url).then((response) => {
  console.log(response);

  let bikeData = response.data.stations

  bikeMarkers = [];
  for (var i = 0; i < bikeData.length; i++) {

    bikeMarkers.push(L.marker([bikeData[i].lat, bikeData[i].lon])
      .bindPopup(`<h3>${bikeData[i].name}</h3> <hr> <h4> Capacity: ${bikeData[i].capacity}</h4>`)
    );
  }

});








