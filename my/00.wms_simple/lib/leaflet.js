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



var crs = new L.Proj.CRS('EPSG:25833',
    '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);

var bordersKommunegrenseLayer = L.tileLayer.wms('http://localhost:8080/geoserver/borders_Kommunegrense/wms', {
    layers: 'borders_Kommunegrense:ADM_enheter_Norge_Kommunegrense_KURVE',
    format: 'image/png',
    transparent: true
    //crs: crs
});
var bordersFylkesgrenseLayer = L.tileLayer.wms('http://localhost:8080/geoserver/borders_Fylkesgrense/wms', {
    layers: 'borders_Fylkesgrense:ADM_enheter_Norge_Fylkesgrense_KURVE',
    format: 'image/png',
    transparent: true
    //crs: crs
});
var bordersRiksgrenseLayer = L.tileLayer.wms('http://localhost:8080/geoserver/borders_Riksgrense/wms', {
    layers: 'borders_Riksgrense:ADM_enheter_Norge_Riksgrense_KURVE',
    format: 'image/png',
    transparent: true
    //crs: crs
});
var urbanRuralLayer = L.tileLayer.wms('http://localhost:8080/geoserver/urBanRural/wms', {
    layers: 'urBanRural:Tettsted2014',
    format: 'image/png',
    transparent: true
    //crs: crs
});

$('#jsonCheckBox').change(function () {
    if ($(this).is(":checked")) {
        //map.addLayer(bordersKommunegrenseLayer);
        //map.addLayer(bordersFylkesgrenseLayer);
        //map.addLayer(bordersRiksgrenseLayer);
        map.addLayer(urbanRuralLayer);
    } else {
        //map.removeLayer(bordersKommunegrenseLayer);
        //map.removeLayer(bordersFylkesgrenseLayer);
        //map.removeLayer(bordersRiksgrenseLayer);
        map.removeLayer(urbanRuralLayer);
    }
});
