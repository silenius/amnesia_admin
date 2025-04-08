<script setup>
import { useLineage } from '../../composables/lineage.js'
import { watchEffect } from 'vue'

const base = import.meta.env.BASE_URL

const props = defineProps({
  content_id: {
    type: Number,
    required: true
  }
})

const emits = defineEmits([
  'navigate'
])

const { get_lineage, lineage } = useLineage()

watchEffect(() => {
  get_lineage(props.content_id)
})
</script>

<template>
  <ol class="shadow-lg border px-4 py-2 rounded-full border-slate-200 w-fit mx-auto flex justify-center">
    <li class="flex" v-for="(item, idx) in lineage" :key="item.id">
      <a class="flex items-center" href="#" @click="$emit('navigate', item)">
        <a :href="base" v-if="!idx"><font-awesome-icon icon="fa-solid fa-house" /></a>
        <span :class="[idx+2 >= lineage.length ? 'block' : 'hidden sm:block']" class="ml-2"> / {{ item.title }}</span>
      </a>
    </li>
  </ol>
</template>
