<script setup>

import { ref, watch, computed, onMounted, onUpdated } from 'vue'
import { useRole, useRoles } from '@/composables/roles.js'
import AccountTable from '@/components/account/AccountTable.vue'

const props = defineProps({
    role: Object
})

const { getMembers, addMember, deleteMember } = useRole()

onMounted( () => {

  watch(() => props.role, (r, old_r) => {
    getMembers()
  })

})

const add_member = async (id) => {
  await addMember(id)
  getMembers()
}

const delete_member = async (id) => {
  await deleteMember(id)
  getMembers()
}

</script>


<template>
  <div>
    / Members

    <AccountTable :accounts="role.members" :enabled="false">
      <template #headers>
        <th class="text-center">Member</th>
      </template>
      <template #tds="tdsProps">
        <td v-if="tdsProps.account.member" class="p-2">
          <button class="hover:bg-red-300 bg-red-200 px-2 hover:text-red-700 rounded w-full p-1 text-red-600" @click="delete_member(tdsProps.account.id)">remove</button>
        </td>
        <td v-else="tdsProps.account.member" class="p-2"> <button class="hover:bg-green-300 bg-green-200 px-2 hover:text-green-700 rounded w-full p-1 text-green-600" @click="add_member(tdsProps.account.id)">add</button>
        </td>
      </template>
    </AccountTable>
  </div>
</template>
