<script setup>

import { ref, watch, onMounted } from 'vue'
import { useFetch } from '@/services/fetch.js'

const roles = ref([]);
const url = 'http://10.209.1.41:10613/bbpf/roles/browse';

onMounted(() => {
    const options = {
        headers: {
            accept: 'application/json'
        }
    }
    const { data, error } = fetch(url, options)
    data.value = JSON.parse(data.value)
    console.log(data)
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
                <td></td>
            </tr>
        </tbody>

    </table>

</template>
