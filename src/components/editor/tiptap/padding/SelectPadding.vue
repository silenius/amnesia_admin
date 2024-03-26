<template>
  <Listbox v-model="px">
    <ListboxButton>Horizontal padding (px)</ListboxButton>
    <ListboxOptions>
      <ListboxOption
        v-for="level in levels"
        :key="level"
        :value="level"
      >
        <span>{{ level }}</span>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>

</template>

<script setup>

import { ref, computed, watch } from 'vue'

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from '@headlessui/vue'

const props = defineProps({
  extension: Object,
  tr: Object
})

const emits = defineEmits(['select-padding'])

const levels = computed(() => props.extension.options.levels)
const px = ref()
watch(px, () => {
  emits('select-padding', {side: 'px', level: px.value})
})

</script>
