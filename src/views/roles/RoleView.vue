<script setup>

import { ref, computed, onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { useRole } from '@/composables/roles.js'

const props = defineProps({
    role_id: Number
})

const { getRole, role } = useRole()

onMounted( () => {
    getRole(props.role_id)
})

</script>

<template>
  <div>
    ROLE {{ role_id }}
    <RouterView :role="role" />
  </div>
</template>
