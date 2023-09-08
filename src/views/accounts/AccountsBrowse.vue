<script setup>

import { ref, onMounted } from 'vue'
import AccountTable from '@/components/account/AccountTable.vue'
import { useUsersStore } from '@/stores/users.js'

const user_store = useUsersStore()

onMounted( async () => {
  await user_store.getAll()
})

const toggleEnabled = async (account) => {
  await user_store.patch(account.id, {
    enabled: !account.enabled
  })
}

const doDestroy = async (account) => {
  await user_store.deleteUser(account.id)
}

</script>

<template>
  <div>
  <AccountTable 
  :accounts="user_store.users" 
  :actions="true" 
  @delete-account="doDestroy"
  @toggle-enabled="toggleEnabled" 
  class="mt-4"
/>
    </div>
</template>
