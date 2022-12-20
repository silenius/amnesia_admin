<script setup>
import { ref, computed, onMounted } from 'vue'

import RoleForm from '@/components/role/RoleForm.vue'

const fdp = ref('lol');

</script>

<template>
    Add Role page
    <input v-model="fdp" />
    <RoleForm :role="fdp" @update:name="value => fdp = value" />

</template>
