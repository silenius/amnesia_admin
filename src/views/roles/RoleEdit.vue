<script setup>

import { ref, provide, computed, onMounted } from 'vue'

import RoleForm from '@/components/role/RoleForm.vue'
import { useRole } from '@/composables/roles.js'

const props = defineProps({
    role: Object
})

const { updateRole } = useRole()

const errors = ref({})

const setError = (key, value) => {
  errors.value[key] = value
}

provide('errors', {
  errors,
  setError
})

</script>

<template>
    <h1>Edit role</h1>
    <RoleForm 
      :role="role" 
      :action="'Update role'"
      @submit-role="updateRole" 
    />
</template>
