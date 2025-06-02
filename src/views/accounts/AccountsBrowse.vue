<script setup>

import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import AccountTable from '../../components/account/AccountTable.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import SelectLimit from '../../components/pagination/SelectLimit.vue'
import { useUsersStore } from '../../stores/users.js'

const user_store = useUsersStore()
const { meta, users } = storeToRefs(user_store)

onMounted( async () => {
  await user_store.browse()
})

const doDestroy = async (account) => {
  await user_store.deleteUser(account.id)
}

</script>

<template>
  <div>
    <div class="flex">
      <h1 class="flex grow gap-2 items-center mb-4 text-3xl border-b font-bold">
        <font-awesome-icon class="block" :icon="['fa-solid', 'fa-user-astronaut']" />
        Accounts
      </h1>
      <SelectLimit :limit="meta.limit" @set-limit="(v) => user_store.change_limit(v)" />
    </div>
    <h2 class="text-2xl">This sections enables you to manage accounts</h2>
    <AccountTable 
      class="mt-4"
      :accounts="users" 
      :actions="true" 
      @delete-account="doDestroy"
      @toggle-enabled="(a) => user_store.patch(a.id, { enabled: !a.enabled})" 
    />
    <Pagination
      v-if="meta.count > meta.limit"
      :limit="meta.limit"
      :offset="meta.offset"
      :total="meta.count"
      @goto-page="(page) => user_store.goto_page(page)"
      class="flex justify-center my-4 gap-x-2"
    />

  </div>
</template>
