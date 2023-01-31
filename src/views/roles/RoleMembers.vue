<script setup>

import { ref, watch, computed, onMounted, onUpdated } from 'vue'
import { useRole, useRoles } from '@/composables/roles.js'
import { useAccounts } from '@/composables/accounts.js'

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
    <p v-for="account in accounts">
      {{ account.login }}
      </p>
  </div>
</template>
