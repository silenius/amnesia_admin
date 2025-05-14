<script setup>
import { toRefs, inject, unref, computed, ref, onMounted, watch } from 'vue'
import { usePermission } from '../../../composables/usePermission.js'
import { useRoles } from '../../../composables/useRole.js'
import { useContentACL } from '../../../composables/useACL.js'

const content = inject('editable')
const { 
  acls, recursive_acls, add_acl, remove_acl, load_recursive_acls,
  change_acl_weight
} = useContentACL(content)

const { permissions } = usePermission()
const { roles } = useRoles()

const selectedAllow = ref()
const selectedPermission = ref()
const selectedRole = ref()

onMounted(() => load_recursive_acls())

const add = async () => {
  try {
    add_acl(selectedAllow, selectedRole, selectedPermission)
  } finally {
    selectedAllow.value=''
    selectedPermission.value=''
    selectedRole.value=''
  }
}

const menuColors = {
  true: [
    'bg-green-200',
    'text-green-700'
  ],
  false: [
    'bg-red-200',
    'text-red-700'
  ],
}

const get_tr = (node) => {
  let target = node

  if (target.nodeType != Node.ELEMENT_NODE) {
    target = target.parentNode
  }

  return target.closest('tr')
}

const drag = (evt) => {
  console.debug('===> DRAG', evt)
}

const start = (evt) => {
  console.debug('===> START', evt)
  evt.target.classList.add('opacity-25', 'border-indigo-500', 'border')
  evt.dataTransfer.dropEffect = "move";
  evt.dataTransfer.setData(
    'text/plain', 
    JSON.stringify({
      acl_id: evt.target.getAttribute('data-acl_id'),
      weight: evt.target.getAttribute('data-weight'),
      idx: evt.target.getAttribute('data-idx')
    })
  )
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

const drop = async (evt) => {
  console.debug('===> DROP', evt)
  evt.preventDefault()

  const data = JSON.parse(evt.dataTransfer.getData('text/plain'))

  const tr = get_tr(evt.target)
  tr.classList.remove('border-lime-500', 'border')

  const weight = content.value.id ? tr.getAttribute('data-weight') : tr.getAttribute('data-idx')

  await change_acl_weight({
    acl_id: data.acl_id, 
    acl_idx: data.idx,
    weight: weight
  })

}
</script>

<template>
  <h1 class="text-2xl">Manage ACLS</h1>
  <p class="mb-4">
    This section allows you to manage the access-control list (ACL) for the
    content. An ACL specifies which roles are granted access to content, as
    well as what operations are allowed on the given content.
  </p>
  <table class="border-collapse mb-4 w-full">
    <thead>
      <tr class="text-left bg-slate-100">
        <th>ACL type</th>
        <th>Role</th>
        <th class="p-2">Allow / Deny</th>
        <th>Permission</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr 
        v-for="(acl, idx) in acls"
        class="cursor-move odd:bg-white even:bg-slate-50"
        draggable="true"
        :data-acl_id="acl.id"
        :data-weight="acl.weight"
        :data-idx="idx"
        @drag="drag"
        @dragstart="start"
        @dragend="end"
        @dragleave="leave"
        @dragenter="enter"
        @dragover="over"
        @drop="drop"
      >
        <td>
          <span class="text-center w-24 inline-block py-1 rounded text-violet-700 bg-violet-200 text-xs">local</span>
        </td>
        <td>{{ acl.role.name }}</td>
        <td class="px-1 py-1 max-w-32">
          <span class="max-w-24 rounded inline-flex w-full justify-center
            px-4 py-1 text-xs font-medium focus:outline-hidden
            focus-visible:ring-2 focus-visible:ring-white
            focus-visible:ring-opacity-75"
            :class="menuColors[acl.allow]">
            <span v-if="acl.allow === true"> Allow </span>
            <span v-if="acl.allow === false"> Deny </span>
          </span>
        </td>
        <td>{{ acl.permission.description }}</td>
        <td class="text-right">
          <button class="hover:bg-red-300 bg-red-200 px-2 hover:text-red-700
            rounded w-24 p-1 text-sm border border-red-300 text-red-600 hover:cursor-pointer"
            @click.prevent="remove_acl(acl, idx)">remove</button>
        </td>
      </tr>
      <template v-for="acl in recursive_acls">
        <tr v-if="acl.content?.id != content.id" class="odd:bg-white even:bg-slate-50">
          <td>
            <template v-if="acl.resource.name.toLowerCase() == 'content'">
              <span class="text-center w-24 inline-block py-1 rounded bg-pink-200 text-pink-700 text-xs">inherited</span>
              <span class="text-xs px-4">({{ acl.content.title }})</span>
            </template>
            <template v-else-if="acl.resource.name.toLowerCase() == 'global'">
              <span class="text-center w-24 inline-block py-1 rounded bg-red-200 text-red-700 text-xs">global</span>
            </template>
          </td>
          <td>{{ acl.role.name }}</td>
          <td class="px-1 py-1 max-w-32">
            <span class="rounded inline-flex w-full justify-center
              px-4 py-1 text-xs font-medium focus:outline-hidden
              focus-visible:ring-2 focus-visible:ring-white
              focus-visible:ring-opacity-75 max-w-24"
              :class="menuColors[acl.allow]">
              <span v-if="acl.allow === true"> Allow </span>
              <span v-if="acl.allow === false"> Deny </span>
            </span>
          </td>
          <td>{{ acl.permission.description }}</td>
          <td>
          </td>
        </tr>
      </template>
    </tbody>
  </table>
  <h2 class="text-xl">Add an new access control entry</h2>
  <table class="w-min shadow">
    <tbody>
      <tr>
        <td>
          <select v-model="selectedAllow">
            <option :value="true">allow</option>
            <option :value="false">deny</option>
          </select>
        </td>

        <td v-if="roles">
          <select v-model="selectedRole">
            <option :value="role" v-for="role in roles" :key="role.id">{{ role.name }}</option>
          </select>
        </td>
        <td v-if="permissions">
          <select v-model="selectedPermission">
            <option :value="permission" v-for="permission in permissions" :key="permission.id">{{ permission.description }}</option>
          </select>
        </td>
        <td>
          <button @click.prevent="add" class="hover:bg-blue-300 bg-blue-200
            px-2 hover:text-blue-700 rounded p-1 text-blue-600">add</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
