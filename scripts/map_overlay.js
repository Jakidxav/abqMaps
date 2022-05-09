"use strict"; // JS strict mode

//Maybe we can use this to fix the symbols on the "Places" layer?
//Define point to circle function
function pointToCircle(feature, latlng) {
  var geojsonMarkerOptions = {
    radius: 1,
    fillColor: "#a10000",
    color: "red",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
  };

  var circleMarker = L.circleMarker(latlng, geojsonMarkerOptions);

  return circleMarker;
}


window.onload = function () {
  // POINTS AND POLYGONS

  // city limits data
  var styleCityLimits = {
    fillOpacity: 0,
    weight: 1,
    opacity: 1,
    color: "#000000",
  };

  var cityLimits = L.geoJSON(citylimits, {
    //onEachFeature: cityLimitsPopups,
    style: styleCityLimits,
  });

  // apd police beats data
  var styleApdBeats = {
    fillOpacity: 0,
    weight: 1,
    opacity: 1,
    color: "#000000",
  };
  
  var apdBeats = L.geoJSON(apdbeats, {
    //onEachFeature: apdBeatsPopups,
    style: styleApdBeats,
  });

  // police incidents data
  var stylePoliceIncidents = {
    fillOpacity: 0,
    weight: 1,
    opacity: 1,
    color: "#a10000",
  };
  
  var policeIncidents = L.geoJSON(policeincidents, {
    //onEachFeature: policeIncidentsPopups,
    pointToLayer: pointToCircle,
    style: stylePoliceIncidents,
  });

  // bike trail data
  var styleBikeTrails = {
    fillOpacity: 0,
    weight: 1,
    opacity: 1,
    color: "#B73239",
  };

  var bikeTrails = L.geoJSON(biketrails, {
    style: styleBikeTrails,
  });

  // city parks data
  var styleCityParks = {
    fillOpacity: 0.5,
    weight: 1,
    opacity: 1,
    color: "#009A17",
  };

  var cityParks = L.geoJSON(cityparks, {
    style: styleCityParks,
  });

  // open spaces data
  var styleOpenSpaces = {
    fillOpacity: 0.5,
    weight: 1,
    opacity: 1,
    color: "#8031A7",
  };

  var openSpaces = L.geoJSON(openspaces, {
    style: styleOpenSpaces,
  });

  // city trails data
  var styleCityTrails = {
    fillOpacity: 0.5,
    weight: 1,
    opacity: 1,
    color: "#Ab784E",
  };

  var cityTrails = L.geoJSON(citytrails, {
    style: styleCityTrails,
  });

  // historic places data
  var styleHistoricPlaces = {
    fillOpacity: 0.5,
    weight: 1,
    opacity: 1,
    color: "#FFB81C",
  };

  var historicPlaces = L.geoJSON(historicplaces, {
    style: styleHistoricPlaces,
  });

  //https://leafletjs.com/SlavaUkraini/examples/layers-control/
  // define point data here
  var placesLayer = L.layerGroup();
  var biopark = L.marker([35.07960233987897, -106.6626523247024])
    .bindPopup("BioPark")
    .addTo(placesLayer);
  var hospital = L.marker([35.089124664249965, -106.61840612465896])
    .bindPopup("UNM Hospital")
    .addTo(placesLayer);
  var sunport = L.marker([35.04764947336518, -106.6121846572487])
    .bindPopup("Sunport")
    .addTo(placesLayer);
  var riogrande = L.marker([35.130659544765976, -106.6828237445549])
    .bindPopup("Rio Grande Nature Center")
    .addTo(placesLayer);

  // add point and polygon data to aggregate layer
  var overlayMaps = {
    "Places": placesLayer,
    "City Limits": cityLimits,
    "APD Beats": apdBeats,
    "Police Incidents": policeIncidents,
    "Bike Trails": bikeTrails,
    "Parks": cityParks,
    "Open Spaces": openSpaces,
    "Trails": cityTrails,
    "Historic Places": historicPlaces,
  };

  // BASEMAPS
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

  //at http://leaflet-extras.github.io/leaflet-providers/preview/
  var usgs_topo = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 20,
    attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
  });

  // create map container, add basemap
  var map = L.map("map_overlay_container", {
    center: [39.73, -104.99], //[35.08770657898809, -106.65591268675824]
    zoom: 11,
    layers: [streets, grayscale, usgs_topo],
  }).setView([35.08770657898809, -106.65591268675824], 11);

  var baseMaps = {
    Streets: streets,
    Grayscale: grayscale,
    Imagery: usgs_topo,
  };

  // combine basemaps and map overlays
  var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

  // add scale bar to map
  L.control.scale().addTo(map);

  // add ruler to map
  L.control.ruler().addTo(map);
  
  // add printing function to map here using easyPrint plugin
  var printer = L.easyPrint({
    // i think adding one baselayer will work for every basemap
    tileLayer: streets,
    sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
    filename: 'abq_map_overlay',
    exportOnly: true,
    hideControlContainer: true
  }).addTo(map);
};