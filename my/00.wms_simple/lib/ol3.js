'use strict';

//proj4.defs("EPSG:25833","+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

var map = new ol.Map({
    target: 'map',
    layers: [
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://opencache.statkart.no/gatekeeper/gk/gk.open?',
                params: {
                    LAYERS: 'topo2',
                    VERSION: '1.1.1'
                }
            })
        }),
        new ol.layer.Tile({
            source: new ol.source.TileWMS({
                url: 'http://localhost:7070/geoserver/borders_Kommunegrense/wms',
                params: {
                    LAYERS: 'borders_Kommunegrense:ADM_enheter_Norge_Kommunegrense_KURVE',
                    VERSION: '1.1.1'
                }
                //projection: 'EPSG:25833'
            })
        })
    ],
    view: new ol.View({
        center: [880337, 8561319],
        zoom: 8
    })
});

