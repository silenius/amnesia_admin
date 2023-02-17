<script setup>

import { RouterLink, RouterView } from 'vue-router'
import { useAccounts } from '@/composables/accounts.js'

const { destroyAccount, patchAccount, getAccounts } = useAccounts()

const toggleEnabled = (account) => {
    patchAccount(account.id, {
        enabled: !account.enabled
    })
}

</script>

<template>
    <div>
        <h1>ACCOUNTS</h1>
        <RouterView 
            @delete-account="destroyAccount"
            @toggle-enabled="toggleEnabled" 
        />
    </div>
</template>
