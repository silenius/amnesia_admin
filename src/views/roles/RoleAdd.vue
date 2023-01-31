<script setup>
import { ref, computed, onMounted } from 'vue'

import RoleForm from '@/components/role/RoleForm.vue'
import { useRoles } from '@/composables/roles.js'

const { createRole, role } = useRoles()

</script>

<template>
  <h1>Add role</h1>
    <RoleForm 
      :role="role" 
      :action="'Create role'"
      @submit_role="createRole" 
    />

</template>
