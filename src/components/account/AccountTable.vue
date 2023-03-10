<script setup>

import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { PencilSquareIcon, TrashIcon, UserIcon, AdjustmentsVerticalIcon, LockClosedIcon, PaperAirplaneIcon } from '@heroicons/vue/20/solid'
import { CheckIcon, XMarkIcon } from '@heroicons/vue/24/outline'

import Avatar from "vue-boring-avatars";

import { useAccounts } from '@/composables/accounts.js'

const props = defineProps({
    accounts: {
        type: Object,
        required: true
    },
    actions: {
        type: Boolean,
        default: false
    },
    enabled: {
        type: Boolean,
        default: true
    }
})

const emit = defineEmits([
  'toggle-enabled',
  'delete-account',
  'edit-account'
])

</script>

<template>
    <table class="table-auto border-spacing-4 text-xs">
        <thead>
            <tr class="text-left bg-slate-100">
                <th class="p-2">Name</th>
                <th v-if="enabled">Enabled</th>
                <slot name="headers"></slot>
                <th v-if="actions">Actions</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="account in accounts" :key="account.id" class="odd:bg-white even:bg-slate-50 text-slate-600">
                <td class="p-2 tracking-wide font-semibold whitespace-nowrap">
                    <div class="grid grid-flow-col w-fit gap-4">
                        <Avatar :size="32" :name="account.full_name" variant="bauhaus" />
                        <span class="flex flex-col">
                            <strong>{{ account.full_name }}</strong>
                            <small>{{ account.email }}</small>
                        </span>
                    </div>
                </td>
                <td v-if="enabled" class="text-center">
                    <button @click="$emit('toggle-enabled', account)">
                        <font-awesome-icon class="h-4 w-4 text-green-600" v-if="account.enabled" icon="fa-solid fa-circle-check"
                    />
                        <font-awesome-icon class="h-4 w-4 text-red-600" v-if="!account.enabled" icon="fa-solid fa-circle-xmark" />
                    </button>
                </td>
                <slot :account="account" name="tds"></slot>
                <td v-if="actions">
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
                                        <button @click="$emit('edit-account', account.id)" :class="[ active ? 'bg-violet-500 text-white' : 'text-gray-900', 'group flex w-full items-center rounded-md px-2 py-2 text-xs']">
                                            <PencilSquareIcon class="h-4 w-4"/> Edit
                                        </button>
                                        </MenuItem>
                                        <MenuItem v-slot="{ active }">
                                        <button @click="$emit('delete-account', account.id)" :class="[ active ? 'bg-red-700 text-white' : 'text-red-700', 'group flex w-full items-center rounded-md px-2 py-2 text-xs']">
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
