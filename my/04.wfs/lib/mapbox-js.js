'use strict';

L.mapbox.accessToken = 'pk.eyJ1IjoicGFuc2VyIiwiYSI6ImNpanJtcWRubDAwYTB2bG03YWQ3MjcwZW0ifQ.Jxy8Jgl2jTqK1KluRyBeBg';

var map = L.mapbox.map('map').setView([62.5, 4.2], 5);
var temperature = L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open?', {
    layers: 'topo2',
    format: 'image/png'
}).addTo(map);

//L.mapbox.map('map', 'mapbox.streets');

//var map = L.mapbox.map('map');
//var layer = L.mapbox.tileLayer('mapbox.streets');
//layer.on('ready', function() {
//    //layer.addTo(map);
//    map.addLayer(layer);
//});
//layer.on('error', function(err) {
//    console.log('error download layer !!!');
//});