<script setup>

import { ref, watch, onMounted } from 'vue'
import { useFetch } from '@/services/fetch.js'

const roles = ref([]);
const url = import.meta.env.VITE_FETCH_ROLES_URL;

onMounted(() => {
    const options = {
        headers: {
            accept: 'application/json'
        }
    }

    fetch(url, options).then((res) => res.json()).then((json) => {
        roles.value = json.roles
    })
})

</script>

<template>
    <table class="table-auto">
        <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="role in roles" :key="role.id">
                <td>{{ role.name }}</td>
                <td>{{ role.description }}</td>
                <td>Foo</td>
            </tr>
        </tbody>

    </table>

</template>
