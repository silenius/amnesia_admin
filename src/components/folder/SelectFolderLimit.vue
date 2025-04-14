<script setup>
import {
  computed
} from 'vue'

import {
  Listbox,
  ListboxLabel,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

const props = defineProps({
  folder: {
    type: Object,
    required: true
  },
  limits: {
    type: Array,
    default: [10, 50, 100, 500],
  },
  limit: {
    type: Number,
    default: 10
  },
})

const emit = defineEmits(['set-limit'])

const limit = computed({
  get () {
    return props.limit
  },
  set (value) {
    emit('set-limit', value)    
  }
})


</script>

<template>
  <Listbox class="relative" as="div" v-model="limit">
    <ListboxButton class="w-12 h-12 bg-rose-500 text-white hover:bg-rose-600 rounded-full
      p-2 hover:ring-4">
      <span class="font-bold">{{ limit }}</span>
    </ListboxButton>
    <ListboxOptions class="absolute bg-white w-max items-center right-0 border z-50 flex flex-col rounded-4xl">
      <span class="font-bold text-xs">Items per page</span>
      <ListboxOption
        :class="{'font-bold': limit == l}"
        class="hover:cursor-pointer"
        v-for="l in props.limits"
        :key="l"
        :value="l"
      >
        {{ l }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>

  <!--
<button class="text-white bg-rose-500 hover:bg-rose-600 hover:ring-4 hover:ring-rose-100 font-medium rounded-full text-sm p-2 mr-2 mb-2 dark:focus:ring-rose-900" @click.prevent="emit('set-view', view == 'tabular' ? 'gallery' : 'tabular')">
<font-awesome-icon class="h-6 w-6 align-middle" :icon="icons[view]" />
</button>
-->
</template>
