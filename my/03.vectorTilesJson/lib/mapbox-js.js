'use strict';

//
//NOT WORK !!!
//

L.mapbox.accessToken = 'pk.eyJ1IjoicGFuc2VyIiwiYSI6ImNpanJtcWRubDAwYTB2bG03YWQ3MjcwZW0ifQ.Jxy8Jgl2jTqK1KluRyBeBg';

var map = L.mapbox.map('map').setView([62.5, 4.2], 5);
var temperature = L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open?', {
    layers: 'topo2',
    format: 'image/png'
}).addTo(map);


//var mapid = 'panser.0j57t0mg';
//var mapid = 'panser.cwzqt7d9';
var mapid = 'panser.cvu9mmxu';
//var mapid = 'mapbox.mapbox-streets-v6';
//var mapid = 'mapbox.streets';
var dataLayer = L.mapbox.gridLayer(mapid).addTo(map);

