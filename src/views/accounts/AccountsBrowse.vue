<script setup>

import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import AccountTable from '../../components/account/AccountTable.vue'
import Pagination from '../../components/pagination/Pagination.vue'
import SelectLimit from '../../components/pagination/SelectLimit.vue'
import BreadcrumbFromRouterMeta from '../../components/breadcrumbs/BreadcrumbFromRouterMeta.vue'
import { useUsersStore } from '../../stores/users.js'

const user_store = useUsersStore()
const { meta, users } = storeToRefs(user_store)

onMounted(() => {
  user_store.browse()
})

const doDestroy = (account) => {
  user_store.deleteUser(account.id)
}

</script>

<template>
  <div>
    <div class="flex">
      <button class="h-12 font-bold hover:outline-hidden text-white bg-emerald-400
        hover:bg-emerald-500 hover:ring-4 hover:ring-emerald-100 rounded-full
        text-sm px-2 justify-center ">
        Add account
      </button>
      <BreadcrumbFromRouterMeta />
      <SelectLimit :limit="meta.limit" @set-limit="(v) => user_store.change_limit(v)" />
    </div>
    <h1 class="flex mt-4 grow gap-2 items-center mb-2 text-xl font-bold">
      <font-awesome-icon class="block" :icon="['fa-solid', 'fa-user-astronaut']" />
      Accounts
    </h1>

    <h2>This sections enables you to manage accounts</h2>
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
