<script setup>

import { ref, watch, onMounted } from 'vue'
import { RouterLink, RouterView, useRouter } from 'vue-router'
import AccountTable from '@/components/account/AccountTable.vue'
import { useAccounts } from '@/composables/accounts.js'

const router = useRouter()

const { getAccounts, accounts } = useAccounts()

onMounted( () => {
  getAccounts()
})

</script>

<template>
    <AccountTable :accounts="accounts"/>
</template>
