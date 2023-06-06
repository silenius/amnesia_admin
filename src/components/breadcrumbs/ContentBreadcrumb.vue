<template>
  <ul class="flex items-center">
    <li v-for="(item, idx) in items" :key="item.id">
      <button @click.prevent="$emit('item-select', item)">
        <font-awesome-icon class="mx-2" icon="fa-solid fa-house" v-if="idx===0" />
        {{ item.title }}
        <font-awesome-icon class="mx-2 text-slate-400" icon="fa-solid fa-angle-right" v-if="idx<items.length-1" />
      </button>
    </li>
    <li class="flex items-center">
      <font-awesome-icon class="mx-2 text-slate-400" icon="fa-solid fa-angle-right" />
      <button>
        <font-awesome-icon class="mx-1 h-6 w-6 hover:text-sky-600
           text-green-600" icon="fa-solid fa-circle-plus" />
      </button>
    </li>
  </ul>
</template>


<script setup>
import { ref, watch } from 'vue'
import { useFolder } from '@/composables/folders.js'

const { getLineage } = useFolder()
const items = ref([])

const props = defineProps({
  content: Object,
})
const emit = defineEmits(['item-select'])

watch(() => props.content, async () => {
  const { data } = await getLineage(props.content.id)
  items.value = data
}, { immediate: true })

</script>
