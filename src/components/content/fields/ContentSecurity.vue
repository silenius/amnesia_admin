<template>
  <table class="table-auto border-spacing-4 text-xs">
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
        class="odd:bg-white even:bg-slate-50 text-slate-600"
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
          {{ acl.role.name }} ({{ acl.weight }})
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
          <select v-model="selectedAllow">
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
</template>


<script setup>
import { inject, ref, onMounted, watch } from 'vue'
import { useContent } from '@/composables/contents.js'
import { usePermissions } from '@/composables/permissions.js'
import { useRoles } from '@/composables/roles.js'

const props = defineProps({
  acls: Object
})

const emit = defineEmits([
  'update:acls'
])

const values = ref([])

const content = inject('content')

const { getPermissions, permissions } = usePermissions()
const { getRoles, roles } = useRoles()
const { addContentACL, deleteContentACL, getContentACL } = useContent()

const selectedAllow = ref()
const selectedPermission = ref()
const selectedRole = ref()

const add = async () => {
  if (!content.id) {
    values.value.unshift({
      allow: selectedAllow.value,
      role: selectedRole.value,
      permission: selectedPermission.value
    })
  } else {
    try {
      await addContentACL(
        selectedAllow.value,
        selectedRole.value.id, 
        selectedPermission.value.id
      )
      getContentACL()
    } finally {
      selectedAllow.value=''
      selectedPermission.value=''
      selectedRole.value=''
    }
  }
}

watch(() => content.acls, async () => {
  values.value = content.acls
})

onMounted(() => {
  if (content.id) {
    values.value = content.acls
  }
  getPermissions()
  getRoles()
})

const delete_acl = async (acl, idx) => {
  if (content.id) {
    await deleteContentACL(acl.id)
    getContentACL()
  } else {
    values.value.splice(idx, 1)
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

</script>
