<script setup>

import { ref, watch, toRefs, computed, onMounted, onUpdated } from 'vue'
import { useRole, useRoleMembers } from '../../composables/useRole.js'
import AccountTable from '../../components/account/AccountTable.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import SelectLimit from '../../components/pagination/SelectLimit.vue'

const props = defineProps({
  role: {
    type: Object,
    required: true
  }
})

const { role } = toRefs(props)

const { members, meta, change_limit, goto_page } = useRoleMembers(role)

/*
const { getMembers, addMember, deleteMember } = useRole()

watch(() => props.role, async () => {
  const { data } = await getMembers(props.role.id)
  members.value = data
})


const add_member = async (id) => {
  await addMember(props.role.id, id)
  const { data } = await getMembers(props.role.id)
  members.value = data

}

const delete_member = async (id) => {
  await deleteMember(props.role.id, id)
  const { data } = await getMembers(props.role.id)
  members.value = data
}
*/

</script>


<template>
  <div v-if="members">
    <div class="flex">
      <h1 class="flex grow gap-2 items-center mb-4 text-3xl border-b font-bold">
        <font-awesome-icon class="block" :icon="['fa-solid', 'fa-user-astronaut']" />
        {{ role.name }} members
      </h1>
      <SelectLimit :limit="meta.limit" @set-limit="(v) => change_limit(v)" />
    </div>
    <h2 class="text-2xl">This sections enables you to manage members of the
      <span class="font-bold">{{ role.name }}</span> role.</h2>
 
    <AccountTable :accounts="members" :enabled="false" class="mt-4">
      <template #headers>
        <th class="text-center">Member</th>
      </template>
      <template #tds="tdsProps">
        <td v-if="tdsProps.account.member" class="p-2">
          <button class="hover:bg-red-300 bg-red-200 px-2 hover:text-red-700 rounded-sm w-full p-1 text-red-600" @click="delete_member(tdsProps.account.id)">remove</button>
        </td>
        <td v-else="tdsProps.account.member" class="p-2"> <button class="hover:bg-green-300 bg-green-200 px-2 hover:text-green-700 rounded-sm w-full p-1 text-green-600" @click="add_member(tdsProps.account.id)">add</button>
        </td>
      </template>
    </AccountTable>
    <Pagination
      v-if="meta.count > meta.limit"
      :limit="meta.limit"
      :offset="meta.offset"
      :total="meta.count"
      @goto-page="goto_page"
      class="flex justify-center my-4 gap-x-2"
    />

  </div>
</template>
