<script setup>
import { 
  Menu, 
  MenuButton, 
  MenuItems, 
  MenuItem, 
} from '@headlessui/vue'

const props = defineProps({
  folder: {
    type: Object,
    required: true
  },
  types: {
    type: Array,
    default: []
  }
})

const emit = defineEmits(['add-content'])
</script>

<template>
  <Menu as="div" class="relative inline" v-if="types">
    <MenuButton class="w-12 h-12 hover:outline-hidden text-white bg-emerald-400
      hover:bg-emerald-500 hover:ring-4 hover:ring-emerald-100 rounded-full text-sm p-2">
      <font-awesome-icon class="h-6 w-6 align-middle" icon="fa-regular fa-square-plus" />
    </MenuButton>
    <MenuItems as="div" class="z-10 absolute left-0 mt-2 w-56
      rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden">
      <MenuItem as="div" v-slot="{ active }" v-for="t in types" :key="t.id">
      <button @click="$emit('add-content', folder, t.name)" :class="[ active ? 'bg-violet-500 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md p-2 text-sm', ]" > 
        <font-awesome-icon class="w-4 h-4 mr-2" :icon="['fa-solid', t.icons.fa]" /> {{ t.name }}
      </button>
      </MenuItem>
    </MenuItems>
  </Menu>


</template>
