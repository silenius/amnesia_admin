<script setup>
import { ref, computed, onMounted } from 'vue'

import RoleForm from '@/components/role/RoleForm.vue'
import { useRoles } from '@/composables/roles.js'

const { createRole } = useRoles()

const role = ref({
  name: '',
  description: ''
});

function add_role() {
  const data = new FormData()
  data.append('name', role.value.name)
  data.append('description', role.value.description)
  createRole(data)
}

</script>

<template>
    Add Role page
    <RoleForm :role="role" @submit_role="add_role" />

</template>
