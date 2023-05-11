<template>
  <div id="map"></div>
</template>


<script setup>

import { ref, onMounted, watch } from 'vue'

import 'ol/ol.css'
import Map from 'ol/Map'
import View from 'ol/View'
import {Tile as TileLayer} from 'ol/layer.js'
import OSM from 'ol/source/OSM'
import Point from 'ol/geom/Point.js'

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
      center: [0, 0],
      zoom: 2,
      minZoom: 2
    })
  })

  if (props.lat && props.lon) {
    center(props.lat, props.lon)
  }

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
