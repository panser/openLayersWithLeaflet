'use strict';

var map = new L.Map('map', {
    layers: [
        L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open?', {
            layers: 'topo2',
            format: 'image/png'
        })
    ]
});
map.setView([62.5, 4.2], 7);



var wellmaxzoom = 5;
//var wellmaxzoom = 7;

var myStyle = {
    "color": 'gray',
    "weight": 3,
    "opacity": 1
};
var geojsonLayerWells = L.geoJson(null,{
    style: myStyle
});
geojsonLayerWells.addTo(map);

function loadGeoJson(data) {
    console.log(data);
    geojsonLayerWells.clearLayers();
    geojsonLayerWells.addData(data);
    map.addLayer(geojsonLayerWells);
};

map.on('moveend', function(){
    if(map.getZoom() > wellmaxzoom){
        var geoJsonUrl ='http://localhost:8080/geoserver/kommuner/ows';
        //var geoJsonUrl ='http://localhost:8080/geoserver/urBanRural/ows';
        //var geoJsonUrl ='http://localhost:8080/geoserver/borders_Kommunegrense/ows';
        var defaultParameters = {
            service: 'WFS',
            version: '1.0.0',
            request: 'getFeature',
            typeName: 'kommuner:kommuner',
            //typeName: 'urBanRural:Tettsted2014',
            //typeName: 'borders_Kommunegrense:ADM_enheter_Norge_Kommunegrense_KURVE',
            maxFeatures: 30000,
            outputFormat: 'application/json',
            srsname: 'EPSG:4326'
        };

        var customParams = {
            bbox: map.getBounds().toBBoxString() + ',EPSG:4326',
        };
        var parameters = L.Util.extend(defaultParameters, customParams);
        console.log(geoJsonUrl + L.Util.getParamString(parameters));

        $.ajax({
            url: geoJsonUrl + L.Util.getParamString(parameters),
            datatype: 'json',
            jsonCallback: 'getJson',
            success: loadGeoJson
        });
    }else{
        map.removeLayer(geojsonLayerWells);
    };
});


$('#jsonCheckBox').change(function () {
    if ($(this).is(":checked")) {
        map.addLayer(geojsonLayerWells);
    } else {
        map.removeLayer(geojsonLayerWells);
    }
});

