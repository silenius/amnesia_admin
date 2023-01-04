<script setup>
import { ref, onMounted, computed } from 'vue'
import NameField from '@/components/role/NameField.vue'
import DescriptionField from '@/components/role/DescriptionField.vue'

import { useRole } from '@/composables/roles.js'

const props = defineProps({
  role: Object
})

const emit = defineEmits([
  'submit_role'
])

const { errors } = useRole()

</script>

<template>
    <form @submit.prevent>
        <NameField v-model="role.name" />
        <DescriptionField v-model="role.description" />
        <button class="rounded w-fit hover:bg-green-200 bg-green-100
        px-4 py-1 text-green-600 focus:outline-none focus-visible:ring-2
        focus-visible:ring-white focus-visible:ring-opacity-75"
        @click="$emit('submit_role')">
        Create role
    </button>

    </form>

</template>
