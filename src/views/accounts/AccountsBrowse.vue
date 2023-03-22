<script setup>

import { ref, onMounted } from 'vue'
import AccountTable from '@/components/account/AccountTable.vue'
import { useAccounts } from '@/composables/accounts.js'


const accounts = ref([])

const { destroyAccount, patchAccount, getAccounts } = useAccounts()

onMounted( async () => {
  await loadAccounts()
})

const loadAccounts = async () => {
  const { data } = await getAccounts()
  accounts.value = data.data.accounts
}

const toggleEnabled = async (account) => {
  await patchAccount(account.id, {
    enabled: !account.enabled
  })
}

const destroy = async (account) => {
  await destroyAccount(account.id)
}

</script>

<template>
  <AccountTable 
    v-if="accounts"
    :accounts="accounts" 
    :actions="true" 
    @delete-account="destroy"
    @toggle-enabled="toggleEnabled" 
  />
</template>
