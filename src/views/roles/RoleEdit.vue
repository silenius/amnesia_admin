<script setup>

import { toValue, ref, toRefs, provide, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

import RoleForm from '../../components/role/RoleForm.vue'
import { useUpdateRole } from '../../composables/useRole.js'

const props = defineProps({
  role: {
    type: Object,
    required: true
  },
  emit_updated: {
    type: Boolean,
    default: false
  }
})

const emits = defineEmits(['role-updated'])

const { role } = toRefs(props)

const { update_role, error } = useUpdateRole(role)

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


const update  = async() => {
  await update_role()

  if (!toValue(error)) {
    if (props.emit_updated) {
      emits('role-updated', role)
    } else {
      router.push(`/${role.value.id}`)
    }
  } else {
    setErrorFromResponse(error)
  }
}


</script>

<template>
    <RoleForm 
      :role="role" 
      :action="'Update role'"
      @submit-role="update" 
    />
</template>
