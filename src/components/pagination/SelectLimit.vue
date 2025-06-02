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
    <ListboxOptions class="absolute bg-white items-center border z-50 flex
      flex-col right-0 rounded">
      <div class="font-bold mb-2">Limit</div>
      <ListboxOption
        :class="{'font-bold': limit == l}"
        class="hover:cursor-pointer w-full text-center px-4 hover:bg-rose-600 hover:text-white"
        v-for="l in props.limits"
        :key="l"
        :value="l"
      >
        {{ l }}
      </ListboxOption>
    </ListboxOptions>
  </Listbox>
</template>
