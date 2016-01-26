'use strict';

//
//NOTHING INTERSTING: work with console errors
//

$(document).ready(function () {

    var map = new L.Map('map', {
        layers: [
            L.tileLayer.wms('http://opencache.statkart.no/gatekeeper/gk/gk.open?', {
                layers: 'topo2',
                format: 'image/png'
            })]
    });
    map.setView([62.5, 4.2], 5);


    var token = 'pk.eyJ1IjoicGFuc2VyIiwiYSI6ImNpanJtcWRubDAwYTB2bG03YWQ3MjcwZW0ifQ.Jxy8Jgl2jTqK1KluRyBeBg';
    var gl = L.mapboxGL({
        token: token,
        style: 'mapbox://styles/mapbox/light-v8'
    }).addTo(map);



});