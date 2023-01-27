<script setup>

import { ref, computed, onMounted } from 'vue'

import RoleForm from '@/components/role/RoleForm.vue'
import { useRole } from '@/composables/roles.js'

const props = defineProps({
    role: Object
})

const { updateRole } = useRole()

function update_role() {
  updateRole()
}

</script>

<template>
    <RoleForm 
      :role="role" 
      :action="'Update role'"
      @submit_role="update_role" 
    />
</template>
