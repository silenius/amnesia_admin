<template>
  <nav>
    <ul class="flex items-center">
      <li v-for="(item, idx) in items" :key="item.id">
        <button class="flex items-center" @click.prevent="$emit('item-select', item)">
          <font-awesome-icon class="mr-2 h-4 w-4" icon="fa-solid fa-house" v-if="idx===0" />
          {{ item.title }}
          <font-awesome-icon class="mx-2 text-slate-400" icon="fa-solid fa-angle-right" v-if="idx<items.length-1" />
        </button>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useFolder } from '@/composables/folders.js'

const { getLineage } = useFolder()
const items = ref([])

const props = defineProps({
  content: {
    type: Object
  },
})
const emit = defineEmits(['item-select'])

watch(() => props.content, async () => {
  const target = props.content.type.name == 'folder' ? props.content.id :
    props.content.parent.id

  const { data } = await getLineage(target)
  items.value = data
}, { immediate: true })

</script>
