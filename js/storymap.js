//colors for obesity layer
var ob_colors = chroma.scale('YlOrBr').colors(5)

function setColor(density1) {
  var id1 = 0;
  if (density1 > 34) { id1 = 4; }
  else if (density1 > 31 && density1 <= 34) { id1 = 3; }
  else if (density1 > 28 && density1 <= 31) { id1 = 2; }
  else if (density1 > 25 && density1 <= 28) { id1 = 1; }
  else { id1 = 0; }
  return ob_colors[id1];
}

function style(feature) {
  return {
      fillColor: setColor(feature.properties.obesity),
      fillOpacity: 0.4,
      weight: 2,
      opacity: 1,
      color: '#b4b4b4',
      dashArray: '4'
  };
}

//colors created for exercise layer
var ex_colors = chroma.scale('Greens').colors(5);

var setcolor1 = function setColor(density2) {
  var id2 = 0;
  if (density2 > 30) { id2 = 4; }
  else if (density2 > 26 && density2 <= 30) { id2 = 3; }
  else if (density2 > 22 && density2 <= 26) { id2 = 2; }
  else if (density2 > 18 && density2 <= 22) { id2 = 1; }
  else { id2 = 0; }
  return ex_colors[id2];
}

var excolor = function style(feature) {
  return {
      fillColor: setcolor1(feature.properties.exercise),
      fillOpacity: 0.4,
      weight: 2,
      opacity: 1,
      color: '#b4b4b4',
      dashArray: '4'
  };
}

//colors created for gyms layer
var gym_colors = chroma.scale('RdYlBu').mode('lch').colors(3);

for (i = 0; i < 3; i++) {
  $('head').append($("<style> .marker-color-" + (i + 1).toString() + " { color: " + gym_colors[i] + "; font-size: 15px; text-shadow: 0 0 3px #ffffff;} </style>"));
}

//legends for each layer defined
var legend1 = '<b>Obesity Rates by State</b><br /><i style="background: ' + ob_colors[4] + '; opacity: 0.5;"></i><p>34.1%-38% Very High</p><i style="background: ' + ob_colors[3] + '; opacity: 0.5;"></i><p>31.1%-34% High</p><i style="background: ' + ob_colors[2] + '; opacity: 0.5;"></i><p>28.1%-31% Average</p><i style="background: ' + ob_colors[1] + '; opacity: 0.5;"></i><p>25.1%-28% Low</p><i style="background: ' + ob_colors[0] + '; opacity: 0.5;"></i><p>22%-25% Very Low</p>'
var legend2 = '<b>Exercise Rates by State</b><br /><i style="background: ' + ex_colors[4] + '; opacity: 0.5;"></i><p>30.1%-32.5% Very High</p><i style="background: ' + ex_colors[3] + '; opacity: 0.5;"></i><p>26.1%-30% High</p><i style="background: ' + ex_colors[2] + '; opacity: 0.5;"></i><p>22.1%-26% Average</p><i style="background: ' + ex_colors[1] + '; opacity: 0.5;"></i><p>18.1%-22% Low</p><i style="background: ' + ex_colors[0] + '; opacity: 0.5;"></i><p>13.5%-18% Very Low</p>'
var legend3 = '<b>Location Type</b><br /><i class="fa fa-map-marker marker-color-1"></i><p>Gym</p><i class="fa fa-map-marker marker-color-2"></i><p>Yoga/Pilates</p><i class="fa fa-map-marker marker-color-3"></i><p>Martial Arts</p>'
//layers
var layers = {
  layer1: {
    layer: L.geoJson.ajax('assets/states.json', {
      style: style,
      weight: 5
    }),
    legend: legend1
  },
  layer2: {
    layer: L.geoJson.ajax('assets/states.json', {
      style: excolor,
      weight: 5
    }),
    legend: legend2
  },
  layer3: {
    layer: L.geoJson.ajax("assets/gyms.geojson", {
      attribution: 'Locations gathered from Google Maps | Story Map created by Kristoffer Stuvstad',
      //click for popup feature
      onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.NAME);
      },
      pointToLayer: function (feature, latlng) {
        var id = 0;
        if (feature.properties.PLACE_TYPE == "GYM") {id = 0;}
        else if (feature.properties.PLACE_TYPE == "YOGA/PILATES") {id = 1;}
        else {id = 2;} //PLACE_TYPE == MARTIAL ARTS
        return L.marker(latlng, {icon: L.divIcon({className: 'fa fa-map-marker marker-color-' + (id + 1).toString() })});
      },
      maxZoom: 18
    }),
    legend: legend3
  },
  layer4: {
    layer: L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	     maxZoom: 18,
	     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | US States &copy; Mike Bostock, D3 | Story Map created by Kristoffer Stuvstad'
    }),
  },
  layer5: {
    layer: L.tileLayer('https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	     maxZoom: 19,
	     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }),
  }
};

//scenes
var scenes = {
  scene1: {lat: 39.828352, lng: -98.579478, zoom: 4, layers: [layers.layer1, layers.layer4], name: "scene1"},
  scene2: {lat: 64.274332, lng: -147.525603, zoom: 4, layers: [layers.layer1, layers.layer4], name: "scene2"},
  scene3: {lat: 21.125796, lng: -157.266316, zoom: 6, layers: [layers.layer1, layers.layer4], name: "scene3"},
  scene4: {lat: 39.828352, lng: -98.579478, zoom: 4, layers: [layers.layer2, layers.layer4], name: "scene4"},
  scene5: {lat: 64.274332, lng: -147.525603, zoom: 4, layers: [layers.layer2, layers.layer4], name: "scene5"},
  scene6: {lat: 21.125796, lng: -157.266316, zoom: 6, layers: [layers.layer2, layers.layer4], name: "scene6"},
  scene7: {lat: 44.5701158, lng: -123.2949388, zoom: 13, layers: [layers.layer3, layers.layer5], name: "scene7"}
};
//storymap object
$('#storymap').storymap({
    //triggerpos: `a string of percentage`, // A percentage string'33.333%',
    scenes: scenes,
    baselayer: layers.layer4,
    legend: true,
    loader: true,
    flyto: false,
    credits: 'Map built by Kristoffer Stuvstad',
    scalebar: true,
    scrolldown: true,
    progressline: true,
    navwidget: true,
    createMap: function () {
      var map = L.map($(".storymap-map")[0], {zoomControl: false}).setView([44, -120], 7);
      basemap = this.baselayer.layer.addTo(map);
      return map;
    }
});
