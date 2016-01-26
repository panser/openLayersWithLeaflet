'use strict';

L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ';

var map = L.mapbox.map('map').setView([62.5, 4.2], 5);
var temperature = L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open?', {
    layers: 'topo2',
    format: 'image/png'
}).addTo(map);


var featureLayer = L.mapbox.featureLayer()
    .loadURL('../../data/geojson/norway.geojson')
    //.loadURL('../../data/geojson/test.geojson')
    .addTo(map);