<script setup>

import { ref, watch, onMounted } from 'vue'
import { useFetch } from '@/services/fetch.js'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { PencilSquareIcon, TrashIcon, UserIcon, AdjustmentsVerticalIcon } from '@heroicons/vue/20/solid'

const roles = ref([]);
const url = import.meta.env.VITE_FETCH_ROLES_URL;

onMounted(() => {
    const options = {
        headers: {
            accept: 'application/json'
        }
    }

    fetch(url, options).then((res) => res.json()).then((json) => {
        roles.value = json.roles
    })
})

</script>

<template>
    <table class="table-auto border-spacing-0 text-xs">
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="role in roles" :key="role.id">
                <td>{{ role.name }}</td>
                <td>{{ role.description }}</td>
                <td>

                    <div class="text-right">
                        <Menu as="div" class="relative text-left">
                            <div>
                                <MenuButton
                                    class="rounded inline-flex w-full justify-center
                                    hover:bg-slate-300 bg-slate-200 px-4 py-1
                                    text-xs font-medium text-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                                >
                                    action
                                </MenuButton>
                            </div>

                            <MenuItems class="z-10 w-56 absolute divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                <div class="px-1 py-1">
                                   <MenuItem v-slot="{ active }">
                                    <button
                                        :class="[
                                            active ? 'bg-violet-500 text-white' : 'text-gray-900',
                                            'group flex w-full rounded-md px-2 py-2 text-xs',
                                        ]"
                                    >
                                        <UserIcon class="w-4 h-4" /> Manage members
                                    </button>
                                    </MenuItem>
                                   <MenuItem v-slot="{ active }">
                                    <button
                                        :class="[
                                            active ? 'bg-violet-500 text-white' : 'text-gray-900',
                                            'group flex w-full rounded-md px-2 py-2 text-xs',
                                        ]"
                                    >
                                        <AdjustmentsVerticalIcon class="w-4 h-4" /> Manage permissions
                                    </button>
                                    </MenuItem>

                                </div>

                                <div class="px-1 py-1">
                                    <MenuItem v-slot="{ active }">
                                    <button
                                        :class="[
                                            active ? 'bg-violet-500 text-white' : 'text-gray-900',
                                            'group flex w-full items-center rounded-md px-2 py-2 text-xs',
                                        ]"
                                    >
                                        <PencilSquareIcon class="h-4 w-4"/> Edit
                                    </button>
                                    </MenuItem>
                                    <MenuItem v-slot="{ active }">
                                    <button
                                        :class="[
                                            active ? 'bg-red-700 text-white' : 'text-red-700',
                                            'group flex w-full items-center rounded-md px-2 py-2 text-xs',
                                        ]"
                                    >
                                        <TrashIcon class="h-4 w-4" /> Delete
                                    </button>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>


                </td>

            </tr>
        </tbody>

    </table>

</template>
