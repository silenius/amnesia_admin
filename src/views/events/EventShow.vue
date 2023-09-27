<template>
  <article class="mt-4 prose">
    <h1 class="drop-shadow-lg">{{ content.title }}</h1>
    <p v-if="content.description">{{ content.description }}</p>
    <div v-if="is_georeferenced" class="w-full h-64" id="event_map_detail">
    </div>
    <div class="flex border">

      <p class="flex m-2 border w-1/2 flex-col items-center">
      <p class="font-bold">When</p>
      <p>from {{ content.starts }} to {{ content.ends }}</p>
      </p>
      
      <p class="flex m-2 flex-col w-1/2 border items-center">
      <p class="font-bold">Address</p>
      <p>{{ content.address }}</p>
      </p>

    </div>
    <p v-html="content.body" />
  </article>
</template>

<script setup>

import { 
  computed, 
  onMounted 
} from 'vue'

import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';

import {
  Tile as TileLayer, 
  Vector as VectorLayer
} from 'ol/layer.js';

import OSM from 'ol/source/OSM';
import * as proj from 'ol/proj';
import Feature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import VectorSource from 'ol/source/Vector.js';

import {
  Icon, 
  Style
} from 'ol/style.js';

import imgloc from './loc.png'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const is_georeferenced = computed(
  () => props.content.address_latitude && props.content.address_longitude
)

onMounted( () => {

const event_loc = new Point([
  props.content.address_longitude, 
  props.content.address_latitude
]).transform('EPSG:4326', 'EPSG:3857'),

iconFeature = new Feature({
  geometry: event_loc,
  name: 'Event'
}),

iconStyle = new Style({
  image: new Icon({ src: imgloc })
}),

vectorSource = new VectorSource({
  features: [iconFeature]
}),

vectorLayer = new VectorLayer({
  source: vectorSource
}),

osm_layer = new TileLayer({
  source: new OSM()
}),

map = new Map({
  target: 'event_map_detail',
  layers: [osm_layer, vectorLayer],
  view: new View({
    center: proj.fromLonLat([
      props.content.address_longitude,
      props.content.address_latitude
    ]),
    zoom: 17,
    minZoom: 7

  })
});

iconFeature.setStyle(iconStyle);
})
</script>
