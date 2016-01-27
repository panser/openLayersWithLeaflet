'use strict';

proj4.defs("EPSG:25833","+proj=utm +zone=33 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs");

var view = new ol.View({
    center: [880337, 8561319],
    zoom: 7
});
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
    view: view
});



var wmsSource = new ol.source.TileWMS({
    url: 'http://localhost:8080/geoserver/urBanRural/wms',
    params: {
        LAYERS: 'urBanRural:Tettsted2014',
        VERSION: '1.1.1',
    }
});
var wmsLayer = new ol.layer.Tile({
    opacity: 0.3,
    source: wmsSource
});



map.on('singleclick', function(evt) {
    document.getElementById('info').innerHTML = '';
    var viewResolution = /** @type {number} */ (view.getResolution());
    var url = wmsSource.getGetFeatureInfoUrl(
        evt.coordinate, viewResolution, 'EPSG:3857',
        {'INFO_FORMAT': 'text/html'});
    if (url) {
        document.getElementById('info').innerHTML =
            '<iframe seamless src="' + url + '"></iframe>';
    }
});
map.on('pointermove', function(evt) {
    if (evt.dragging) {
        return;
    }
    var pixel = map.getEventPixel(evt.originalEvent);
    var hit = map.forEachLayerAtPixel(pixel, function() {
        return true;
    });
    map.getTargetElement().style.cursor = hit ? 'pointer' : '';
});



$('#jsonCheckBox').change(function () {
    if ($(this).is(":checked")) {
        map.addLayer(wmsLayer);
    } else {
        map.removeLayer(wmsLayer);
    }
});
