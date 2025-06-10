<script setup>
import { ref, provide, toValue } from 'vue'
import { useRouter } from 'vue-router'

import RoleForm from '@/components/role/RoleForm.vue'
import { useCreateRole } from '../../composables/useRole.js'

const { create_role, role, error } = useCreateRole()

const errors = ref({})
const router = useRouter()

const setError = (key, value) => {
  if (value === false) {
    delete errors.value[key]
  } else {
    errors.value[key] = value
  }
}

const setErrorFromResponse = async(error) => {
  const error_value = toValue(error)

  for (const [k, v] of Object.entries(error_value.data)) {
    setError(k, v)
  }
}

provide('errors', {
  errors,
  setError,
  setErrorFromResponse
})

const create  = async() => {
  await create_role()

  if (!toValue(error)) {
    router.push(`/${role.value.id}`)
  } else {
    setErrorFromResponse(error)
  }

}

</script>

<template>
    <RoleForm 
      :role="role" 
      :action="'Create role'"
      @submit-role="create" 
    />
</template>
