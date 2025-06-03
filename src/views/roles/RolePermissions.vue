<script setup>

import { watch, onMounted, toRefs, ref } from 'vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import SelectLimit from '../../components/pagination/SelectLimit.vue'
import { useRolePermissions } from '../../composables/useRole.js'

const props = defineProps({
  role: {
    type: Object,
    required: true
  }
})

const { role } = toRefs(props)
const { permissions, meta, change_limit, change_weight, add_global_acl, delete_global_acl } = useRolePermissions(role)

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
    await add_global_acl(
      props.role.id,
      permission.id,
      allow
    )
  } else if (allow === null) {
    console.info(`===> Remove GlobalACL: ${permission.acl_id}`)
    // Allow is unset, delete ACL.
    await delete_global_acl(
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
    change_weight(
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
  <div>
    <div class="flex">
      <h1 class="flex grow gap-2 items-center mb-4 text-3xl border-b font-bold">
        <font-awesome-icon class="block" :icon="['fa-solid', 'fa-user-astronaut']" />
        {{ role.name }} permissions
      </h1>
      <SelectLimit :limit="meta.limit" @set-limit="(v) => change_limit(v)" />
    </div>
    <h2 class="text-2xl">This sections enables you to manage permissions of the
      <span class="font-bold">{{ role.name }}</span> role.</h2>
 
  <table class="mt-4 table-auto box-border border">
    <thead>
      <tr class="text-left text-white bg-slate-500">
        <th class="p-2">Name</th>
        <th>Description</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="permission in permissions" class="odd:bg-white even:bg-slate-50 text-slate-600"
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
        @drop="drop">
        <td class="p-2 tracking-wide font-semibold whitespace-nowrap">
          {{ permission.name }}
        </td>
        <td>
          {{ permission.description }}
        </td>
        <td class="p-2">
          <div class="text-right">
            <Menu as="div" class="relative text-left">
              <div>
                <MenuButton class="rounded inline-flex w-full justify-center
                  px-4 py-1 text-xs font-medium focus:outline-hidden
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
                <MenuItems class="z-10 w-56 absolute divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-hidden">
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
      </tr>
    </tbody>
  </table>
  </div>
</template>
