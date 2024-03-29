<template>
  <div class="grid grid-rows-3 relative justify-items-center items-center">

    <!-- pt: padding top -->

    <Listbox as="div" v-model="pt">
      <ListboxButton>top</ListboxButton>
      <ListboxOptions :class="class_opts">
        <ListboxOption v-for="level in levels" :key="level" :value="level" >
          <span>{{ level }}</span>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
    <div class="grid gap-2 grid-cols-3 justify-items-center items-center">

      <!-- pl: padding left -->

      <Listbox as="div" v-model="pl">
        <ListboxButton>left</ListboxButton>
        <ListboxOptions :class="class_opts">
          <ListboxOption v-for="level in levels" :key="level" :value="level" >
            <span>{{ level }}</span>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
      <div>
        <img :src="paddingSvg" class="w-8 bg-white p-1" />
      </div>

      <!-- pr: padding right -->

      <Listbox as="div" v-model="pr">
        <ListboxButton>right</ListboxButton>
        <ListboxOptions :class="class_opts">
          <ListboxOption v-for="level in levels" :key="level" :value="level" >
            <span>{{ level }}</span>
          </ListboxOption>
        </ListboxOptions>
      </Listbox>
    </div>

    <!-- pb: padding bottom -->

    <Listbox as="div" v-model="pb">
      <ListboxButton>bottom</ListboxButton>
      <ListboxOptions :class="class_opts">
        <ListboxOption v-for="level in levels" :key="level" :value="level" >
          <span>{{ level }}</span>
        </ListboxOption>
      </ListboxOptions>
    </Listbox>
  </div>

  <!-- px: padding horizontal -->

  <Listbox as="div" v-model="px">
    <ListboxButton>horizontal</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="level in levels" :key="level" :value="level" >
        <span>{{ level }}</span>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>

  <!-- py: padding vertical -->

  <Listbox as="div" v-model="py">
    <ListboxButton>vertical</ListboxButton>
    <ListboxOptions :class="class_opts">
      <ListboxOption v-for="level in levels" :key="level" :value="level" >
        <span>{{ level }}</span>
      </ListboxOption>
    </ListboxOptions>
  </Listbox>

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

const class_opts = [
  'absolute', 'max-h-24', 'px-4', 'bg-white', 'overflow-scroll', 'z-10'
]

const px = ref()
const py = ref()

const pt = ref()
const pr = ref()
const pb = ref()
const pl = ref()

const levels = computed(() => props.extension.options.levels)

watch(px, () => emits('select-padding', {side: 'px', level: px.value}))
watch(py, () => emits('select-padding', {side: 'py', level: py.value}))

watch(pt, () => emits('select-padding', {side: 'pt', level: pt.value}))
watch(pr, () => emits('select-padding', {side: 'pr', level: pr.value}))
watch(pb, () => emits('select-padding', {side: 'pb', level: pb.value}))
watch(pl, () => emits('select-padding', {side: 'pl', level: pl.value}))

</script>
