<template>
  <div class="grid grid-rows-3">
    <Listbox as="div">
      <ListboxButton>top</ListboxButton>
      <ListboxOptions>
        <ListboxOption v-for="level in levels" :key="level" :value="level" >
          <span>{{ level }}</span>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
    <div class="grid grid-cols-3">
      <Listbox as="div">
        <ListboxButton>left</ListboxButton>
        <ListboxOptions>
          <ListboxOption v-for="level in levels" :key="level" :value="level" >
            <span>{{ level }}</span>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
      <div>
        <img :src="paddingSvg" class="w-8 bg-white p-1" />
      </div>
      <Listbox as="div">
        <ListboxButton>right</ListboxButton>
        <ListboxOptions>
          <ListboxOption v-for="level in levels" :key="level" :value="level" >
            <span>{{ level }}</span>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>
    <Listbox as="div">
      <ListboxButton>bottom</ListboxButton>
      <ListboxOptions>
        <ListboxOption v-for="level in levels" :key="level" :value="level" >
          <span>{{ level }}</span>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>

</template>

<script setup>

import { ref, computed, watch } from 'vue'
import paddingSvg from "@/assets/padding.svg";

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
