"use strict"; // JS strict mode

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
  }).bindPopup(chart);

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

  // add point and polygon data to aggregate layer
  var overlayMaps = {
    "Places": placesLayer,
    "City Limits": cityLimits,
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
    Topography: usgs_topo,
  };

  // combine basemaps and map overlays
  var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

  // add scale bar to map
  L.control.scale().addTo(map);
  
  // add printing function to map here using easyPrint plugin
  var printer = L.easyPrint({
    // i think adding one baselayer will work for every basemap
    tileLayer: streets,
    sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
    filename: 'abq_map_overlay',
    exportOnly: true,
    hideControlContainer: true
  }).addTo(map);



  // begin D3 chart code
  function chart(d) {
    var feature = d.feature;
    var data = feature.properties.popData;
    var width = 300;
    var height = 100;
    var margin = { left: 25, right: 10, top: 40, bottom: 40 };

    var div = d3.create("div");
    var svg = div
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom);
    var g = svg
      .append("g")
      .attr("transform", "translate(" + [margin.left, margin.top] + ")");

    const populationMinMax = d3.extent(data, (d) => d);
    var y = d3.scaleLinear().range([height, 0]).domain(populationMinMax);
    var yAxis = d3
      .axisLeft()
      .ticks(4)
      .scale(y)
      .tickFormat(function (d) {
        return parseFloat(d) / 1000;
      });
    g.append("g").call(yAxis);

    var x = d3.scaleBand().domain(d3.range(4)).range([0, width - 10]);
    var xAxis = d3
      .axisBottom()
      .scale(x)
      .tickFormat(function (d) {
        return d * 10 + 1990;
      });

    g.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)translate(-12,-15)");

    var rects = g
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("y", height)
      .attr("height", 0)
      .attr("width", x.bandwidth() - 10)
      .attr("x", function (d, i) {
        return x(i);
      })
      .attr("fill", "steelblue")
      .transition()
      .attr("height", function (d) {
        return height - y(d);
      })
      .attr("y", function (d) {
        return y(d);
      })
      .duration(1000);

    var title = svg
      .append("text")
      .style("font-size", "14px")
      .text(feature.properties.title)
      .attr("x", width / 2 + margin.left)
      .attr("y", 30)
      .attr("text-anchor", "middle");

    return div.node();
  }
};