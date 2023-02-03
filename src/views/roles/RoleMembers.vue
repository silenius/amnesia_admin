<script setup>

import { ref, watch, computed, onMounted, onUpdated } from 'vue'
import { useRole, useRoles } from '@/composables/roles.js'
import { useAccounts } from '@/composables/accounts.js'
import { AccountTable } from '@/components/accounts/AccountTable.vue'

const props = defineProps({
    role: Object
})

const { getMembers } = useRole()
const { getAccounts, accounts } = useAccounts()

onMounted( () => {

  watch(() => props.role, (r, old_r) => {
    getMembers()
  })

  getAccounts()

  console.log('===>>> RoleMembers mounted')
})

onUpdated( () => {
  console.log('===>>> RoleMembers updated')
})

</script>


<template>
  <div>
    / Members
    <p v-for="member in role.members">
      {{ member.login }}
    </p>

    <AccountTable />
  </div>
</template>
