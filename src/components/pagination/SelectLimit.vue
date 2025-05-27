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
    <ListboxOptions class="absolute bg-white items-center w-fit border z-50 flex flex-col rounded-4xl">
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
</template>
