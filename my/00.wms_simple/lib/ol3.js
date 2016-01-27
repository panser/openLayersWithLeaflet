'use strict';

proj4.defs("EPSG:25833","+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

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
    ],
    view: new ol.View({
        center: [880337, 8561319],
        zoom: 7
    })
});



var bordersKommunegrenseLayer = new ol.layer.Tile({
    opacity: 0.3,
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/borders_Kommunegrense/wms',
        params: {
            LAYERS: 'borders_Kommunegrense:ADM_enheter_Norge_Kommunegrense_KURVE',
            VERSION: '1.1.1'
        }
    })
});
var bordersFylkesgrenseLayer = new ol.layer.Tile({
    opacity: 0.3,
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/borders_Fylkesgrense/wms',
        params: {
            LAYERS: 'borders_Fylkesgrense:ADM_enheter_Norge_Fylkesgrense_KURVE',
            VERSION: '1.1.1'
        }
    })
});
var bordersRiksgrenseLayer = new ol.layer.Tile({
    opacity: 0.3,
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/borders_Riksgrense/wms',
        params: {
            LAYERS: 'borders_Riksgrense:ADM_enheter_Norge_Riksgrense_KURVE',
            VERSION: '1.1.1'
        }
    })
});
var urbanRuralLayer = new ol.layer.Tile({
    opacity: 0.3,
    source: new ol.source.TileWMS({
        url: 'http://localhost:8080/geoserver/urBanRural/wms',
        params: {
            //LAYERS: 'urBanRural:tettsted_4326',
            LAYERS: 'urBanRural:Tettsted2014',
            VERSION: '1.1.1',
        }
    })
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
