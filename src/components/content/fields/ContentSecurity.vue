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
        v-for="acl in acls"
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
          {{ acl.role.name }}
        </td>
        <td>
          {{ acl.permission.description }}
        </td>
        <td>
          <button class="hover:bg-red-300 bg-red-200 px-2 hover:text-red-700 rounded w-full p-1 text-red-600" @click="delete_member(tdsProps.account.id)">remove</button>

        </td>
      </tr>
    </tbody>
  </table>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useContent } from '@/composables/contents.js'

const props = defineProps({
  acls: Object
})

const emit = defineEmits([
  'update:acls'
])

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
