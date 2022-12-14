<script setup>

import { ref, watch, onMounted, inject } from 'vue'
import { useFetchBackend } from '@/composables/fetch.js'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { PencilSquareIcon, TrashIcon, UserIcon, AdjustmentsVerticalIcon, LockClosedIcon, PaperAirplaneIcon } from '@heroicons/vue/20/solid'

const roles = ref([])

onMounted(() => {
  const { data, error } = useFetchBackend('roles/browse')

  watch(data, (x) => {
    roles.value = x.data.roles
  })
})

</script>

<template>
  <table class="table-auto border-spacing-4 text-xs">
    <thead>
      <tr class="text-left bg-slate-100">
        <th class="p-2">Name</th>
        <th></th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="role in roles" :key="role.id" class="odd:bg-white
        even:bg-slate-50 text-slate-600">
        <td class="p-2 tracking-wide font-semibold whitespace-nowrap">
          {{ role.name }}
        </td>
        <td class="p-2">
          <LockClosedIcon v-if="role.locked" class="inline h-4 w-4 fill-red-500" />
          <PaperAirplaneIcon v-if="role.virtual" class="inline h-4 w-4 fill-cyan-500" />
        </td>
        <td class="tracking-tighter">{{ role.description }}</td>
        <td>
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
                  <div class="px-1 py-1">
                    <MenuItem v-slot="{ active }">
                    <button :class="[ active ? 'bg-violet-500 text-white' : 'text-gray-900', 'group flex w-full rounded-md px-2 py-2 text-xs']">
                      <UserIcon class="w-4 h-4" /> Manage members
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button :class="[ active ? 'bg-violet-500 text-white' : 'text-gray-900', 'group flex w-full rounded-md px-2 py-2 text-xs']">
                      <AdjustmentsVerticalIcon class="w-4 h-4" /> Manage permissions
                    </button>
                    </MenuItem>
                  </div>

                  <div class="px-1 py-1" v-if="!role.locked">
                    <MenuItem v-slot="{ active }">
                    <button :class="[ active ? 'bg-violet-500 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-xs']">
                      <PencilSquareIcon class="h-4 w-4"/> Edit
                    </button>
                    </MenuItem>
                    <MenuItem v-slot="{ active }">
                    <button :class="[ active ? 'bg-red-700 text-white' : 'text-red-700', 'group flex w-full items-center rounded-md px-2 py-2 text-xs']">
                      <TrashIcon class="h-4 w-4" /> Delete
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
