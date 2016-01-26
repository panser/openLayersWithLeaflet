'use strict';

L.mapbox.accessToken = 'pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ';

var map = L.mapbox.map('map').setView([62.5, 4.2], 5);
var temperature = L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open?', {
    layers: 'topo2',
    format: 'image/png'
}).addTo(map);


//var usLayer = omnivore.topojson('../../data/topojson/world-110m.json')
var usLayer = omnivore.topojson('../../data/topojson/test.topojson')
//var usLayer = omnivore.topojson('../../data/topojson/test_full.topojson')
    .addTo(map);