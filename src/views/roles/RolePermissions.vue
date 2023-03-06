<script setup>

import { watch, onMounted } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useRole } from '@/composables/roles.js'

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
    getPermissions()
  })
})

const get_tr = (node) => {
  let target = node

  if (target.nodeType != Node.ELEMENT_NODE) {
    target = target.parentNode
  }

  return target.closest('tr')
}

const change_permission = async (permission, allow) => {
  if (permission.acl_id === null) {
    console.info(`===> Add new GlobalACL: ${permission.name} / ${allow}`)
    // Add a new ACL
    await addGlobalACL(
      permission.id,
      allow
    )
  } else if (allow === null) {
    console.info(`===> Remove GlobalACL: ${permission.acl_id}`)
    // Allow is unset, delete ACL.
    await deleteGlobalACL(
      permission.acl_id
    )
  } else {
    console.info(`===> Update GlobalACL: ${permission.acl_id} / ${allow}`)
    // Update it's allow field
    await patchGlobalACL(
      permission.acl_id,
      {'allow': allow}
    )
  }

  getPermissions()
}

const update_weight = async (acl_id, weight) => {
  console.info(`===> Update ACL ${acl_id} weight to ${weight}`)
  await patchGlobalACL(
    acl_id,
    {'weight': weight}
  )
  getPermissions()
}

const drag = (evt) => {
  console.debug('===> DRAG', evt)
}

const start = (evt) => {
  console.debug('===> START', evt)
  evt.target.classList.add('opacity-25', 'border-indigo-500', 'border')
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.setData('text/plain', evt.target.getAttribute('data-acl_id'))
}

const end = (evt) => {
  console.debug('===> END', evt)
  const tr = get_tr(evt.target)
  tr.classList.remove('opacity-25', 'border-indigo-500', 'border')
}

const enter = (evt) => {
  console.debug('===> ENTER', evt)
  evt.preventDefault()
}

const leave = (evt) => {
  console.debug('===> LEAVE', evt)

  const tr = get_tr(evt.target)
  tr.classList.remove('border-lime-500', 'border')
}

const over = (evt) => {
  console.debug('===> OVER', evt)
  evt.preventDefault()

  const tr = get_tr(evt.target)
  tr.classList.add('border-lime-500', 'border')
}

const drop = (evt) => {
  console.debug('===> DROP', evt)

  const tr = get_tr(evt.target)
  tr.classList.remove('border-lime-500', 'border')

  const acl_id = evt.dataTransfer.getData('text/plain')
  const weight = tr.getAttribute('data-weight')

  if (acl_id && weight) {
    update_weight(
      evt.dataTransfer.getData('text/plain'),
      tr.getAttribute('data-weight')
    )
  }

  evt.preventDefault()
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
      <tr v-for="permission in role.permissions" 
        :key="permission.id"
        :class="{ 'cursor-move': permission.allow !== null }"
        :data-weight="permission.weight"
        :data-acl_id="permission.acl_id"
        :draggable="permission.allow !== null"
        @drag="drag"
        @dragstart="start"
        @dragend="end"
        @dragleave="leave"
        @dragenter="enter"
        @dragover="over"
        @drop="drop"
        class="odd:bg-white even:bg-slate-50 text-slate-600">
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
