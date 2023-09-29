<template>
  <article class="mt-4 prose">
    <h1 class="drop-shadow-lg">{{ content.title }}</h1>
    <p v-if="content.description">{{ content.description }}</p>
    <p class="flex gap-2 bg-lime-500 p-2 text-white items-center">
      <font-awesome-icon class="h-6 w-6" icon="fa-regular fa-clock" />
      from <span class="font-bold">{{ starts }}</span> to <span
        class="font-bold">{{ ends }}</span>
    </p>
    <div v-if="is_georeferenced" class="w-full h-64" id="event_map_detail"></div>
    <p class="flex gap-4 bg-slate-500 p-2 text-white">
      <span class="flex gap-2 items-center">
        <font-awesome-icon class="h-6 w-6" icon="fa-solid fa-building" />
        <span>{{ content.location }}</span>
      </span>
      <span class="flex gap-2 items-center">
        <font-awesome-icon class="h-6 w-6" icon="fa-solid fa-location-dot" />
        <span class="text-justify">{{ content.address }}</span>
      </span>
    </p>
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

const starts = computed(() => new Date(props.content.starts).toLocaleString())
const ends = computed(() => new Date(props.content.ends).toLocaleString())

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
