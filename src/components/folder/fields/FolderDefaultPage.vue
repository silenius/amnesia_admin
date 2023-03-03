<template>
  <div>
    <label class="block">
      <input type="checkbox" v-model="active"/>
      <span>Select a default page</span>
    </label>
  </div>
  <div v-if="active">
    <div v-for="page in pages" :key="page.id">
      <input name="index_content_id" type="radio" v-model="value" :value="page.id" />{{ page.title }}
    </div>
  </div>
  </template>

<script setup>
import { ref, computed, onMounted, watchEffect } from 'vue'
import { useFolder } from '@/composables/folders.js'

const props = defineProps({
  index_content_id: Number
})

const emit = defineEmits([
  'update:index_content_id',
])

const { getIndexCandidates } = useFolder()

const active = ref(false)
const pages = ref([])

const value = computed({

  get() {
    return props.index_content_id
  },

  set(value) {
    emit('update:index_content_id', value)
  }

})

onMounted( () => {
  if (props.index_content_id) {
    active.value = true
  }

  watchEffect( async () => {
    if (!active.value) {
      value.value = null
    } else {
      pages.value = await getIndexCandidates()
    }

  })
})


</script>
