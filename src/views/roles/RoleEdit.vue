<script setup>

import { ref, computed, onMounted } from 'vue'

import RoleForm from '@/components/role/RoleForm.vue'
import { useRole } from '@/composables/roles.js'

const props = defineProps({
    role: Object
})

function edit_role() {
  const data = new FormData()
  data.append('name', role.value.name)
  data.append('description', role.value.description)
  createRole(data)
}

</script>

<template>
    <RoleForm :role="role" @submit_role="edit_role" />
</template>
