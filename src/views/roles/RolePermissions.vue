<script setup>

import { ref, watch, computed, onMounted, onUpdated } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ViewfinderCircleIcon } from '@heroicons/vue/20/solid'
import { useRole, useRoles } from '@/composables/roles.js'
import { useAccounts } from '@/composables/accounts.js'
import AccountTable from '@/components/account/AccountTable.vue'

const props = defineProps({
    role: Object
})

const { 
    getPermissions, 
    deleteGlobalACL, 
    addGlobalACL,
    patchGlobalACL
} = useRole()

onMounted( () => {
    watch(() => props.role, (r, old_r) => {
        console.log('===> WATCH')
        getPermissions()
    })
})

const change_permission = async (permission, allow) => {
    if (permission.acl_id === null) {
        // Add a new ACL
        await addGlobalACL(
            permission.id,
            allow
        )
    } else if (allow === null) {
        // Allow is unset, delete ACL.
        await deleteGlobalACL(
            permission.acl_id
        )
    } else {
        // Update it's allow field
        await patchGlobalACL(
            permission.acl_id,
            {'allow': allow}
        )
    }

    getPermissions()
}

const drag = (evt) => {
    console.log('===> DRAG')
    console.log(evt)
    evt.target.style.border='4px dotted red'
}

const start = (evt) => {
    console.log('===> START')
    console.log(evt)
    evt.target.style.opacity='0.4'
    evt.target.style.border='1px dotted black'
    console.log(evt.target.getAttribute('data-weight'))
    evt.dataTransfer.dropEffect = "move";
    evt.dataTransfer.setData('text/plain', evt.target.getAttribute('data-id'))
}

const end = (evt) => {
    console.log('===> END')
    console.log(evt)
    evt.target.style.opacity='1'
    evt.target.style.border='0'
}

const enter = (evt) => {
    console.log('===> ENTER')
    console.log(evt)
}

const leave = (evt) => {
    console.log('===> LEAVE')
    console.log(evt)

    let target = evt.target
    if (target.nodeType != Node.ELEMENT_NODE)
        target = target.parentNode

    const tr = target.closest('tr')

    tr.style.border='0'
    console.log('WEIGHT: ' + tr.getAttribute('data-weight'))
}

const over = (evt) => {
    console.log('===> OVER')
    console.log(evt)
    let target = evt.target
    if (target.nodeType != Node.ELEMENT_NODE)
        target = target.parentNode

    const tr = target.closest('tr')
    tr.style.border='4px dotted red'
}

const drop = (evt) => {
    console.log('===> DROP')
    console.log(evt)
}

const menuColors = {
    true: [
        'hover:bg-green-300',
        'bg-green-200',
        'text-green-700'
    ],
    false: [
        'hover:bg-red-300',
        'bg-red-200',
        'text-red-700'
    ],
    null: [
        'hover:bg-slate-300',
        'bg-slate-200',
        'text-gray-700'
    ]
}

</script>


<template>
    <table class="table-auto border-spacing-4 text-xs">
        <thead>
            <tr class="text-left bg-slate-100">
                <th class="p-2">Name</th>
                <th>Description</th>
                <th>Status</th>
                <th>Order</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="permission in role.permissions" :key="permission.id"
                :data-weight="permission.weight"
                :data-id="permission.acl_id"
                class="odd:bg-white cursor-move even:bg-slate-50 text-slate-600" 
                :draggable="permission.allow !== null"
                @drag="drag"
                @dragstart="start"
                @dragend="end"
                @dragleave="leave"
                @dragenter="enter"
                @dragover="over"
                @drop="drop">
                <td class="p-2 tracking-wide font-semibold whitespace-nowrap">
                    {{ permission.name }}
                </td>
                <td>
                    {{ permission.description }}
                </td>
                <td>
    <div class="text-right">
                        <Menu as="div" class="relative text-left">
                            <div>
                                <MenuButton class="rounded inline-flex w-full justify-center
                                    px-4 py-1 text-xs font-medium focus:outline-none
                                    focus-visible:ring-2 focus-visible:ring-white
                                    focus-visible:ring-opacity-75"
                                    :class="menuColors[permission.allow]">
                                    <span v-if="permission.allow === true"> Allow </span>
                                    <span v-if="permission.allow === false"> Deny </span>
                                    <span v-if="permission.allow === null">Unset</span>
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
                                        <MenuItem v-if="permission.allow !== false" v-slot="{ active }">
                                        <button @click="change_permission(permission, false)" :class="[ active ? 'bg-violet-500 text-white' : 'text-gray-900', 'group flex w-full rounded-md px-2 py-2 text-xs']">
                                            Deny
                                        </button>
                                        </MenuItem>

                                        <MenuItem v-if="permission.allow !== true" v-slot="{ active }">
                                        <button @click="change_permission(permission, true)" :class="[ active ? 'bg-violet-500 text-white' : 'text-gray-900', 'group flex w-full rounded-md px-2 py-2 text-xs']">
                                            Allow
                                        </button>
                                        </MenuItem>
                                        <MenuItem v-if="permission.allow !== null" v-slot="{ active }">
                                        <button @click="change_permission(permission, null)" :class="[ active ? 'bg-violet-500 text-white' : 'text-gray-900', 'group flex w-full rounded-md px-2 py-2 text-xs']">
                                            Unset
                                        </button>
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </transition>
                        </Menu>
                    </div>
                </td>
                <td>
                    <font-awesome-icon v-if="permission.allow !== null" icon="fa-solid fa-up-down-left-right" class="w-full text-slate-700" />
                </td>
            </tr>
        </tbody>
    </table>
    </template>
