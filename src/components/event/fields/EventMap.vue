<template>
  <div id="map" class="h-64 w-full"></div>
</template>


<script setup>

import { ref, onMounted, watch } from 'vue'

import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js'
import Vector from 'ol/source/Vector.js';
import OSM from 'ol/source/OSM'
import * as proj from 'ol/proj'
import * as ctrl from 'ol/control'
import Feature from 'ol/Feature.js'
import Overlay from 'ol/Overlay.js'
import Point from 'ol/geom/Point.js'
import VectorSource from 'ol/source/Vector.js'
import {Icon, Style} from 'ol/style.js'

const props = defineProps({
  lat: {
    type: Number,
    default: 0
  },
  lon: {
    type: Number,
    default: 0
  }
})

const map = ref()

onMounted( () => {
  map.value = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: [props.lat, props.lon],
      zoom: 2,
      minZoom: 2
    })
  })
})

const center = (lat, lon, zoom=15) => {
  const point = new Point([lon, lat]).transform(
    'EPSG:4326', 'EPSG:3857'
  );

  map.value.getView().setCenter(point.getCoordinates());
  map.value.getView().setZoom(zoom);
}

watch(() => (props.lat, props.lon), () => { 
  if (props.lat === null && props.lon === null) {
    center(0, 0, 2)
  } else {
    center(props.lat, props.lon)
  }
})

</script>
