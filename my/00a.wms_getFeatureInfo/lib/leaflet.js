'use strict';




var map = new L.Map('map', {
    layers: [
        L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open?', {
            layers: 'topo2',
            format: 'image/png'
        }),
    ]
});
map.setView([60, 6.2], 7);

var url = 'http://localhost:8080/geoserver/urBanRural/wms';
var urbanLayer = L.tileLayer.betterWms(url, {
    opacity: 0.3,
    layers: 'urBanRural:Tettsted2014',
    format: 'image/png',
    transparent: true
});


$('#jsonCheckBox').change(function () {
    if ($(this).is(":checked")) {
        map.addLayer(urbanLayer);
    } else {
        map.removeLayer(urbanLayer);
    }
});
