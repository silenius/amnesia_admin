<script setup>
import { ref, provide, computed, onMounted } from 'vue'

import RoleForm from '@/components/role/RoleForm.vue'
import { useRoles } from '@/composables/roles.js'

const { createRole } = useRoles()

const role = ref({
  name: '',
  description: ''
})

const errors = ref({})

const setError = (key, value) => {
  errors.value[key] = value
}

provide('errors', {
  errors,
  setError
})


const create = async () => {
  await createRole(role).catch(e => {
    console.log('ERROR')
  })
}

</script>

<template>
  <h1>Add role</h1>
    <RoleForm 
      :role="role" 
      :action="'Create role'"
      @submit-role="create" 
    />

</template>
