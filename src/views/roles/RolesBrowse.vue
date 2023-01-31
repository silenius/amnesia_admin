<script setup>

import { RouterLink, RouterView, useRouter } from 'vue-router'
import RoleTable from '@/components/role/RoleTable.vue'

const router = useRouter()

function add_role() {
    router.push({name: 'add_role'})
}

</script>

<template>
    <button class="rounded w-fit hover:bg-green-200 bg-green-100
        px-4 py-1 text-green-600 focus:outline-none focus-visible:ring-2
        focus-visible:ring-white focus-visible:ring-opacity-75"
        @click="add_role">
        Add Role
    </button>
    <RoleTable />
</template>
