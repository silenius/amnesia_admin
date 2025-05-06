<script setup>
import { toRefs } from 'vue'
import { useLineage } from '../../composables/lineage.js'

const base = import.meta.env.BASE_URL

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const emits = defineEmits([
  'navigate'
])

const { content } = toRefs(props)
const { lineage } = useLineage(content)
</script>

<template>
  <ol v-if="lineage" class="shadow-lg border px-4 py-2 rounded-full border-slate-200 w-fit mx-auto flex justify-center">
    <li class="flex" v-for="(item, idx) in lineage" :key="item.id">
      <a class="flex items-center" href="#" @click="$emit('navigate', item)">
        <a :href="base" v-if="!idx"><font-awesome-icon icon="fa-solid fa-house" /></a>
        <span :class="[idx+2 >= lineage.length ? 'block' : 'hidden sm:block']" class="ml-2"> / {{ item.title }}</span>
      </a>
    </li>
  </ol>
</template>
