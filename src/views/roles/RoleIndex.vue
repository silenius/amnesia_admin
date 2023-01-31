<script setup>

import { ref, computed, onMounted, onUpdated } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useRole } from '@/composables/roles.js'

const props = defineProps({
    role_id: Number
})

const { getRole, role } = useRole()

onUpdated( () => {
  console.log('===>>> RoleIndex updated')
})

onMounted( () => {
    console.log('===>>> RoleIndex mounted')
    getRole(props.role_id)
})

</script>

<template>
  <div>
    ROLE / {{ role.name }}
    <RouterView :role="role" />
  </div>
</template>
