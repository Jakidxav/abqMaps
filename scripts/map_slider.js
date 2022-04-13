"use strict"; // JS strict mode

window.onload = function () {
    // create map container, add basemap
    var map = L.map("map_slider_container", {
        center: [39.73, -104.99], //[35.08770657898809, -106.65591268675824]
        zoom: 11,
    }).setView([35.08770657898809, -106.65591268675824], 11);

    // define basemap here
    var basemapAttribution =
        'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>';

    var basemapURL =
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

    var streets = L.tileLayer(basemapURL, {
        id: "mapbox/streets-v11",
        attribution: basemapAttribution,
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 18,
    }).addTo(map);

    var slider = document.getElementById("backgroundImageSlider");
    var output = document.getElementById("sliderDisplay");
    output.innerHTML = "Albuquerque in " + slider.value; // Display the default slider value

    var imageUrl = `../media/ABQ_${slider.value}_GE.jpg`;
    var imageBounds = [
            [35.22711145535215, -106.32774353027345],
            [34.94842790637081, -106.9841766357422]
        ];
    var imgOverlay = L.imageOverlay(imageUrl, imageBounds).addTo(map);

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        output.innerHTML = "Albuquerque in " + this.value;
        var imageUrl = `../media/ABQ_${this.value}_GE.jpg`;
        var imgOverlay = L.imageOverlay(imageUrl, imageBounds).addTo(map);
        console.log(imageUrl)
    }

    // add scale bar to map
    L.control.scale().addTo(map);

    // add printing function to map here using easyPrint plugin
    var printer = L.easyPrint({
        tileLayer: streets,
        sizeModes: ['Current', 'A4Landscape', 'A4Portrait'],
        filename: 'abq_map_slider',
        exportOnly: true,
        hideControlContainer: true
    }).addTo(map);

    // add lat/lon printouts in console, for debugging
    /*
  console.log("map loaded")
  console.log(map.getBounds());
  map.on('moveend', function () {
    console.log(map.getBounds());
  });
  */
};