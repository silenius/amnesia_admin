<template>
  <Listbox v-model="value" multiple by="id" v-if="polymorphic_loading">
    <ListboxButton>
      {{ value.length > 0 ? value.map((t) => t.name).join(', ') : "ALL" }}
    </ListboxButton>
    <ListboxOptions>
      <ListboxOption v-for="t in types" :key="t.id" :value="t">
        {{ t.name }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

import { useContentTypes } from '@/composables/content_types.js'

const props = defineProps({
  polymorphic_children: {
    type: Array,
    default: []
  },
  polymorphic_loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits([
  'update:polymorphic_children'
])

const { getContentTypes } = useContentTypes()

const types = ref([])

onMounted( async () => {
  types.value = await getContentTypes()
})

watch(() => props.polymorphic_loading, (v) => {
  if (v === false) {
    value.value = []
  }
})

const value = computed({

  get() {
    return props.polymorphic_children
  },

  set(value) {
    emit('update:polymorphic_children', value)
  }

})

</script>
