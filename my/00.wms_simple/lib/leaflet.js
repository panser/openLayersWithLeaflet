'use strict';


var crs = new L.Proj.CRS('EPSG:25833',
    '+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs'
);


var map = new L.Map('map', {
    layers: [
        L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open?', {
            layers: 'topo2',
            format: 'image/png'
        }),
        L.tileLayer.wms('http://localhost:7070/geoserver/borders_Kommunegrense/wms', {
            layers: 'borders_Kommunegrense:ADM_enheter_Norge_Kommunegrense_KURVE',
            format: 'image/png',
            transparent: true
            //crs: crs
        }),
    ]
});
map.setView([62.5, 4.2], 5);