<template>
  <Menu :open="open" as="div" class="relative z-10">
    <div>
      <MenuButton as="span">
        <font-awesome-icon icon="fa-solid fa-text-height" />
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems
        class="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
      >
        <div class="px-1 py-1">
          <MenuItem v-slot="{ active }" v-for="(value, key) in sizes">
          <button
            @click.prevent="onSelectSize(key, value)"
            :class="[
              active ? 'bg-violet-500 text-white' : 'text-gray-900',
              'group flex w-full items-center rounded-md px-2 py-2',
              value.class
            ]"
          >
            {{ value.label }}
          </button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import { ref } from 'vue'

import { 
  Menu, MenuButton, MenuItems, MenuItem 
} from '@headlessui/vue'

import { sizes }  from './constants'

const emits = defineEmits(['select-size'])

const onSelectSize = (size, props) => emits('select-size', size, props)
const open = ref(false)

</script>

