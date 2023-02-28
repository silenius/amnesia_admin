<script setup>

import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

import Avatar from "vue-boring-avatars";

defineProps({
  contents: Array,
  folder: Object
})

</script>

<template>
  <table class="border-collapse table-fixed">
    <thead>
      <tr class="text-left">
        <th class="p-2">Title</th>
        <th class="p-2">Description</th>
        <th class="p-2">Owner</th>
        <th class="p-2">Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-if="folder.container_id" class="text-slate-600">  
        <td colspan="5" class="p-2">
          <button @click="$emit('browse', folder.container_id)">
            <font-awesome-icon class="h-4 w-4 align-middle" icon="fa-solid
              fa-arrow-up-from-bracket p-4" /> back to {{ folder.title }}</button>
        </td>
      </tr>
      <tr v-for="content in contents" :key="content.id" class="odd:bg-white even:bg-slate-50 text-slate-600">
        <td class="whitespace-nowrap p-2">
          <font-awesome-icon class="h-4 w-4 mr-2 align-middle" :icon="['fa-solid', content.type.icons['fa']]" />
          <button @click="$emit('browse', content.id)"
            v-if="content.type.name=='folder'" class="underline
            decoration-slate-400 decoration-dotted underline-offset-4">{{ content.title }}</button>
          <template v-if="content.type.name!='folder'">{{ content.title }}</template>
        </td>
        <td class="p-2">
          {{ content.description }}
        </td>
        <td class="p-2 whitespace-nowrap">
          <div class="grid grid-flow-col w-fit gap-2">
            <Avatar :size="24" :name="content.owner.full_name" variant="bauhaus" />
            <span class="flex flex-col">
              {{ content.owner.full_name }}
            </span>
          </div>
        </td>
        <td class="p-2">
          <div class="text-right">
            <Menu as="div" class="relative text-left">
              <div>
                <MenuButton class="rounded inline-flex w-full justify-center hover:bg-slate-300 bg-slate-200 px-4 py-1 text-xs font-medium text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
                  action
                </MenuButton>
              </div>

              <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-out"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0"
              >
                <MenuItems class="z-10 w-56 absolute divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div>
                    <MenuItem v-slot="{ active }">
                    <button @click="$emit('edit-content', content.id)" :class="[ active ? 'bg-violet-500 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-xs']">
                      <font-awesome-icon class="h-4 w-4" icon="fa-solid fa-pen-to-square" /> Edit
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button @click="$emit('delete-content', content.id)" :class="[ active ? 'bg-red-700 text-white' : 'text-red-700', 'group flex w-full items-center rounded-md px-2 py-2 text-xs']">
                      <font-awesome-icon class="h-4 w-4" icon="fa-solid fa-trash-can" /> Delete
                    </button>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
  </template>


