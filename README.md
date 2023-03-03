# abqMaps
*Interactive Web Maps for Albuquerque, New Mexico*

### About
Welcome to our site! Here, you will find several open-source implementations of maps that you can find in GIS software for the Albuqerque, New Mexico area. Our goal for making this site is to highlight how land-use decisions have affected and continue to affect people and the environment.

This site provides various mappings tools that enable users to visualize data, produce maps, explore the history of development in Albuquerque, and answer some social, economic, and environmental questions through a geographic lens.

The maps can be used interactively on this site, where you can create maps that you are interested in and then download them as PNG files. However, we also have included the source code of the maps so that users can customize their maps to their specific needs and interests. In this way, each map can be thought of as a template or starting point (i.e., we've figured out how to make the maps work using open-source code, so users can simply add the data that they are interested in).
          
### Team members
<a href="https://github.com/liandrews" target="_blank">Luke Andrews</a><br><br>
<a href="https://github.com/Jakidxav" target="_blank">Jakidxav</a>

### Project advisor
Dr <a href="https://lipingyang.org" target="_blank">Liping Yang</a> (course instructor of GEOG 485L/585L Internet Mapping)

### Acknowledgements
#### Data sources
Here is a working list of our data sources:
- Aerial imagery for Albuquerque <a href="https://earth.google.com/web/@0,0,0a,22251752.77375655d,35y,0h,0t,0r" target="_blank">[Google Earth]</a>
- Demographic (population) and economic (MHI, GDP) data <a href="https://www.census.gov/data.html" target="_blank">[US Census Bureau]</a>
- City limits, police beats, and police incidents data <a href="https://opendata.cabq.gov/dataset/city-limits/resource/caabe2a0-a585-4bef-b68d-4743c17fb21c" target="_blank">[City of Albuquerque OpenData]</a>
- Bike trails, parks, open spaces, trails, historic places, transit routes and stops <a href="https://github.com/ABQOpenData/ABQGeoJSON" target="_blank">[ABQGeoJSON]</a>
- Neighborhoods, contours, land use, streets, and zoning <a href="https://www.cabq.gov/gis/geographic-information-systems-data" target="_blank">[City of Albuquerque GIS data]</a>
- Water cover data from 2010 <a href="https://catalog.data.gov/dataset/2010-bernalillo-county-nm-current-area-hydrography" target="_blank">[data.gov]</a>

#### Data processing and conversion steps
The heatmap GeoTIFF files (.tif) needed the extra pre-processing step of using GDAL's <a href="https://gdal.org/programs/gdal_polygonize.html" target="_blank">gdal_polygonize()</a> method in Python before exporting the shapefiles to GeoJSON using QGIS. Specifically, I used the method like this: <br><br>
<code>gdal_polygonize.py -8 your_tifs_name.tif -f "ESRI Shapefile" output_name.shp</code>

All shapefiles (.shp) and zipped Keyhole Markup Language files (.kmz) were converted to JSON format using QGIS with the help of <a href="https://gist.github.com/YKCzoli/b7f5ff0e0f641faba0f47fa5d16c4d8d" target="_blank">this</a> tutorial.

To correctly format GeoJSON files for use as JSON files, we made use of the <a href="https://jsonformatter.org/" target="_blank">{JSON formatter}</a> tool.

#### Code references
- Leaflet <a href="https://leafletjs.com/" target="_blank">[link]</a>
- Bootstrap navbar <a href="https://getbootstrap.com/docs/4.6/components/navbar/" target="_blank">[link]</a>
- easyPrint <a href="https://github.com/rowanwins/leaflet-easyPrint" target="_blank">[GitHub]</a>
- leaflet-splitmap <a href="https://github.com/QuantStack/leaflet-splitmap" target="_blank">[GitHub]</a>
- leaflet-ruler <a href="https://github.com/gokertanrisever/leaflet-ruler" target="_blank">[GitHub]</a>
- Prettify for formatting code cells in HTML <a href="https://github.com/googlearchive/code-prettify" target="_blank">[GitHub]</a>
