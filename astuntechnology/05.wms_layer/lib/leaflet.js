// Define a Proj4Leaflet crs instance configured for British National Grid
// (EPSG:27700) and the resolutions of our base map
var crs = new L.Proj.CRS(
    'EPSG:27700',
    '+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs',
    {
        resolutions: [1600,800,400,200,100,50,25,10,5,2.5,1,0.5,0.25,0.125,0.0625]
    }
);

// Define a standard Leaflet map specifying our crs instance and define a WMS
// base map
var map = new L.Map('map', {
    crs: crs,
    continuousWorld: true,
    worldCopyJump: false,
});

map.setView([52.5, -1.8], 0);



var districtLayer = L.tileLayer.wms('http://t0.ads.astuntechnology.com/open/osopen/service', {
    layers: 'osopen',
    format: 'image/png',
    maxZoom: 14,
    minZoom: 0,
    continuousWorld: true,
    attribution: 'Astun Data Service &copy; Ordnance Survey.',
}).addTo(map);


// -- GeoJSON layer --

// Make a request for GeoJSON features, and add them to a layer using the
// default marker style and zoom to their extent
reqwest({
    url: 'http://digitalservices.surreyi.gov.uk/developmentcontrol/0.1/applications/search?status=live&gsscode=E07000214&status=live',
    type: 'json',
}).then(function (data) {
    var planningAppsLayer = L.geoJson(data, {
        // -- Layer options here --

        /// Define a function that will be called once for each feature that is
        // added to the GeoJSON layer. Here we define a popup for each feature
        onEachFeature: function addPopup (feature, marker) {
            var tmplt = '<h2><a href="{caseurl}">{casereference}</a></h2>';
            tmplt += '<p>{locationtext}</p><p>Status: {status} {statusdesc}</p>';
            marker.bindPopup(L.Util.template(tmplt, feature.properties));
        },

    }).addTo(map);
    // Zoom to the extent of all features
    map.fitBounds(planningAppsLayer.getBounds());
});



