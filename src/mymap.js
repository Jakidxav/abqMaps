"use strict"; // JS strict mode

window.onload = function () {
  // set leaflet style for point and polygon data
  var styleCityLimits = {
    fillOpacity: 0,
    weight: 1,
    opacity: 1,
    color: "#000000",
  };

  var styleBikeTrails = {
    fillOpacity: 0,
    weight: 1,
    opacity: 1,
    color: "#B73239",
  };

  var styleCityParks = {
    fillOpacity: 0.5,
    weight: 1,
    opacity: 1,
    color: "#009A17",
  };

  var styleOpenSpaces = {
    fillOpacity: 0.5,
    weight: 1,
    opacity: 1,
    color: "#8031A7",
  };

  var styleCityTrails = {
    fillOpacity: 0.5,
    weight: 1,
    opacity: 1,
    color: "#Ab784E",
  };

  var styleHistoricPlaces = {
    fillOpacity: 0.5,
    weight: 1,
    opacity: 1,
    color: "#FFB81C",
  };

  /*
  // function to set tooltip popup for city limits
  function cityLimitsPopups(feature, layer) {
    // adds popup when you click on a field system boundary
    var cityLimitsValue = "<b>City limits:</b> " + feature.properties.System;
    if (feature.properties && feature.properties.System) {
      layer.bindPopup(cityLimitsValue);
    }
  }
  */

  //https://leafletjs.com/SlavaUkraini/examples/layers-control/
  // define point and polygon data here
  var placesLayer = L.layerGroup();
  var biopark = L.marker([35.10234795549811, -106.68069662766312])
    .bindPopup("BioPark")
    .addTo(placesLayer);
  var hospital = L.marker([35.09086260154882, -106.60443253827218])
    .bindPopup("UNM Hospital")
    .addTo(placesLayer);
  var sunport = L.marker([35.04764947336518, -106.6121846572487])
    .bindPopup("Sunport")
    .addTo(placesLayer);
  var riogrande = L.marker([35.13576626999782, -106.6964103825461])
    .bindPopup("Rio Grande Nature Center")
    .addTo(placesLayer);

  var cityLimits = L.geoJSON(citylimits, {
    //onEachFeature: cityLimitsPopups,
    style: styleCityLimits,
  });

  var bikeTrails = L.geoJSON(biketrails, {
    style: styleBikeTrails,
  });

  var cityParks = L.geoJSON(cityparks, {
    style: styleCityParks,
  });

  var openSpaces = L.geoJSON(openspaces, {
    style: styleOpenSpaces,
  });

  var cityTrails = L.geoJSON(citytrails, {
    style: styleCityTrails,
  });

  var historicPlaces = L.geoJSON(historicplaces, {
    style: styleHistoricPlaces,
  });

  var overlayMaps = {
    "Places": placesLayer,
    "City Limits": cityLimits,
    "Bike Trails": bikeTrails,
    "Parks": cityParks,
    "Open Spaces": openSpaces,
    "Trails": cityTrails,
    "Historic Places": historicPlaces,
    //"1985": img1895,
  };


  // define basemaps here
  var basemapAttribution =
    'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';
  var basemapURL =
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

  var grayscale = L.tileLayer(basemapURL, {
    id: "mapbox/light-v9",
    attribution: basemapAttribution,
    tileSize: 512,
    zoomOffset: -1,
    maxZoom: 18,
  });
  var streets = L.tileLayer(basemapURL, {
    id: "mapbox/streets-v11",
    attribution: basemapAttribution,
    tileSize: 512,
    zoomOffset: -1,
    maxZoom: 18,
  });


  /*
  var img1895 = L.tileLayer('../media/map_tiles/{z}/{x}/{y}.jpg', {
    attribution: 'Georeferenced image',
    tms:true
  }).addTo(map);
  */

  // create map container, add basemap
  var map = L.map("map_container", {
    center: [39.73, -104.99], //[35.08770657898809, -106.65591268675824]
    zoom: 11,
    layers: [streets, grayscale],
  }).setView([35.08770657898809, -106.65591268675824], 11);

  var baseMaps = {
    Streets: streets,
    Grayscale: grayscale,
  };

  /*
  var baseMaps = {
    "<span style='color: gray'>Grayscale</span>": grayscale,
    Streets: streets,
  };
  */

  // combine basemaps and map overlays
  var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

  console.log("map loaded")
  console.log(map.getBounds());
  map.on('moveend', function() { 
    console.log(map.getBounds());
  });
};
