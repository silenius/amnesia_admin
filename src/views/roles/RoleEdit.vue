<script setup>

import { ref, computed, onMounted } from 'vue'

import RoleForm from '@/components/role/RoleForm.vue'
import { useRole } from '@/composables/roles.js'

const props = defineProps({
    role: Object
})

const { updateRole } = useRole()

</script>

<template>
    <h1>Edit role</h1>
    <RoleForm 
      :role="role" 
      :action="'Update role'"
      @submit_role="updateRole" 
    />
</template>
