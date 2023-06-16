<template>
  <h3 class="text-lg">Local ACLS</h3>
  <table class="table-auto border-spacing-4 mb-4">
    <thead>
      <tr class="text-left bg-slate-100">
        <th class="p-2"></th>
        <th>Role</th>
        <th>Permission</th>
        <th></th>
      </tr>
    </thead>

    <tbody>
      <tr 
        v-for="(acl, idx) in values"
        class="cursor-move odd:bg-white even:bg-slate-50 text-slate-600"
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
        <td class="px-1 py-1">
          <span class="rounded inline-flex w-full justify-center
            px-4 py-1 text-xs font-medium focus:outline-none
            focus-visible:ring-2 focus-visible:ring-white
            focus-visible:ring-opacity-75"
            :class="menuColors[acl.allow]">
            <span v-if="acl.allow === true"> Allow </span>
            <span v-if="acl.allow === false"> Deny </span>
          </span>
        </td>
        <td>
          {{ acl.role.name }}
        </td>
        <td>
          {{ acl.permission.description }}
        </td>
        <td>
          <button class="hover:bg-red-300 bg-red-200 px-2 hover:text-red-700
            rounded w-full p-1 text-red-600"
            @click.prevent="delete_acl(acl, idx)">remove</button>
        </td>
      </tr>
      </tbody>
      <tfoot>
      <tr>
        <td>
          <select v-model="selectedAllow" class="w-full">
            <option value="yes">allow</option>
            <option value="no">deny</option>
          </select>
        </td>

        <td>
          <select v-model="selectedRole">
            <option :value="role" v-for="role in roles" :key="role.id">{{ role.name }}</option>
          </select>
        </td>
        <td>
          <select v-model="selectedPermission">
            <option :value="permission" v-for="permission in permissions" :key="permission.id">{{ permission.description }}</option>
          </select>
        </td>
        <td>
          <button @click.prevent="add" class="hover:bg-blue-300 bg-blue-200
            px-2 hover:text-blue-700 rounded w-full p-1 text-blue-600">add</button>
        </td>
      </tr>
    </tfoot>
  </table>

  <p class="text-lg">
    Parent ACLS
  </p>

  <table class="table-auto border-spacing-4">
    <thead>
      <tr class="text-left bg-slate-100">
        <th>Type</th>
        <th class="p-2"></th>
        <th>Role</th>
        <th>Permission</th>
      </tr>
    </thead>

    <tbody>
      <tr 
        v-for="acl in recursive_acls"
        class="odd:bg-white even:bg-slate-50 text-slate-600"
      >
        <td>
          {{ acl.resource.name }}
          <span v-if="acl.content">
            {{ acl.content.title }}
          </span>
        </td>
        <td class="px-1 py-1">
          <span class="rounded inline-flex w-full justify-center
            px-4 py-1 text-xs font-medium focus:outline-none
            focus-visible:ring-2 focus-visible:ring-white
            focus-visible:ring-opacity-75"
            :class="menuColors[acl.allow]">
            <span v-if="acl.allow === true"> Allow </span>
            <span v-if="acl.allow === false"> Deny </span>
          </span>
        </td>
        <td>
          {{ acl.role.name }}
        </td>
        <td>
          {{ acl.permission.description }}
        </td>
      </tr>
      </tbody>
  </table>

</template>


<script setup>
import { inject, unref, computed, ref, onMounted, watch } from 'vue'
import { useContent } from '@/composables/contents.js'
import { usePermissions } from '@/composables/permissions.js'
import { useRoles } from '@/composables/roles.js'

const props = defineProps({
  acls:  {
    type: Array,
    default: []
  }
})

const emit = defineEmits([
  'update:acls'
])

const recursive_acls = ref([])
const values = ref([...props.acls])

const content = unref(inject('editable'))

const { getPermissions, permissions } = usePermissions()
const { getRoles, roles } = useRoles()
const { 
  addContentACL, 
  deleteContentACL, 
  patchContentACL, 
  getContentACL,
  getContentParentACLS
} = useContent()

const selectedAllow = ref()
const selectedPermission = ref()
const selectedRole = ref()

const refresh = async () => {
  const { data } = await getContentACL(content.id)  
  values.value = data
}

const add = async () => {
  try {
    if (!content.id) {
      values.value.unshift({
        allow: selectedAllow.value === 'yes' ? true : false,
        role: selectedRole.value,
        permission: selectedPermission.value
      })
    } else {
        await addContentACL(
          content.id,
          selectedAllow.value,
          selectedRole.value.id, 
          selectedPermission.value.id
        )
        refresh()
    }
  } finally {
      selectedAllow.value=''
      selectedPermission.value=''
      selectedRole.value=''
    }
}

watch(values, () => emit('update:acls', values), { deep: true })

onMounted( async () => {
  if (content.id) {
    refresh()
  }
  const { data } = await getContentParentACLS(content.container_id)
  recursive_acls.value = data
  getPermissions()
  getRoles()
})

const delete_acl = async (acl, idx) => {
  if (content.id) {
    await deleteContentACL(acl.id)
    refresh()
  } else {
    values.value.splice(idx, 1)
  }
}

const update_weight = async (data, weight) => {
  if (content.id) {
    console.info(`===> Update ACL ${data.acl_id} weight to ${weight}`)
    await patchContentACL(
      data.acl_id,
      {'weight': weight}
    )
    refresh()
  } else {
    console.info(`===> Update ACL at idx ${data.idx} weight to idx ${weight}`)
    const acl = values.value.splice(data.idx, 1)
    values.value.splice(weight, 0, acl[0])
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

const drop = (evt) => {
  console.debug('===> DROP', evt)

  const data = JSON.parse(evt.dataTransfer.getData('text/plain'))

  const tr = get_tr(evt.target)
  tr.classList.remove('border-lime-500', 'border')

  const weight = content.id ? tr.getAttribute('data-weight') : tr.getAttribute('data-idx')

  update_weight(data, weight)

  evt.preventDefault()
}


</script>
