"use strict"; // JS strict mode

window.onload = function () {
    // create map container, add basemap
    var map = L.map("map_slider_container", {
        center: [39.73, -104.99], //[35.08770657898809, -106.65591268675824]
        zoom: 11,
    }).setView([35.08770657898809, -106.65591268675824], 11); // 35.0877696809, -106.655960083

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

    // begin slider logic here
    // this array is for the census population data
    var abqPopulation = {
        "1990": "386,988",
        "2000": "448,607",
        "2010": "545,852",
        "2020": "564,559"
    }

    // this array is for the New Mexico MHI data
    var nmMHI = {
        "1990": "$40,230",
        "2000": "$43,949",
        "2010": "$42,186",
        "2020": "$51,243"
    }

    // this array is for the New Mexico MHI data
    var rioDischarge = {
        "1990": "1981-1990: 1,145.04",
        "2000": "1991-2000: 1,110.1",
        "2010": "2001-2010: 885.65",
        "2020": "2011-2020: 608.49"
    }

    // access slider and two <p> tags that change with the slider
    var slider = document.getElementById("backgroundImageSlider");
    var yearDisplay = document.getElementById("yearDisplay");
    var popDisplay = document.getElementById("popDisplay");
    var mhiDisplay = document.getElementById("mhiDisplay");
    var dischargeDisplay = document.getElementById("dischargeDisplay");

    // display the default slider (year) value alongside population
    yearDisplay.innerHTML = "Albuquerque in " + slider.value;
    popDisplay.innerHTML = "Population: " + abqPopulation[slider.value];
    mhiDisplay.innerHTML = "New Mexico Median Household Income: " + nmMHI[slider.value];
    dischargeDisplay.innerHTML = "Rio Grande Average Decadal Discharge in cubic feet per second " + rioDischarge[slider.value];

    var imageUrl = `../media/ABQ_${slider.value}_GE.jpg`;
    var imageBounds = [
            [35.2833338, -106.2363219],
            [34.8873773, -107.0528981]
            // [35.22711145535215, -106.32774353027345], These are the values that were in originally before Luke changed it. Feel free to delete.
            // [34.94842790637081, -106.9841766357422]
        ];
    var imgOverlay = L.imageOverlay(imageUrl, imageBounds).addTo(map);
    //map.fitBounds(imageBounds);

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function () {
        // change map background image
        var imageUrl = `../media/ABQ_${this.value}_GE.jpg`;
        var imgOverlay = L.imageOverlay(imageUrl, imageBounds).addTo(map);

        // change year and population display
        yearDisplay.innerHTML = "Albuquerque in " + this.value;
        popDisplay.innerHTML = "Population: " + abqPopulation[this.value];
        mhiDisplay.innerHTML = "New Mexico Median Household Income: " + nmMHI[this.value];
        dischargeDisplay.innerHTML = "Rio Grande Average Decadal Discharge in cubic feet per second " + rioDischarge[this.value];
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
};