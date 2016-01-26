'use strict';

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
        })
    ],
    view: new ol.View({
        center: [1891337, 9772319],
        zoom: 5
    })
});

