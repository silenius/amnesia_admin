<script setup>
import { ref, computed, onMounted } from 'vue'

import RoleForm from '@/components/role/RoleForm.vue'

const role = ref({
  name: '',
  description: ''
});

</script>

<template>
    Add Role page
    <RoleForm :role="role" />

</template>
