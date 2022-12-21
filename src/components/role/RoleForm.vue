<script setup>
import { ref, onMounted, computed } from 'vue'
import NameField from '@/components/role/NameField.vue'
import DescriptionField from '@/components/role/DescriptionField.vue'

import { useRole } from '@/composables/roles.js'
const { errors } = useRole()
const role = ref({

})


function onClick() {
  console.log(role)
  for (const error in errors.value) {
    console.log(error);

  }
}

</script>

<template>
    <form @submit.prevent>
        <NameField v-model="role.name" />
        <DescriptionField v-model="role.description" />
        <button class="rounded w-fit hover:bg-green-200 bg-green-100
        px-4 py-1 text-green-600 focus:outline-none focus-visible:ring-2
        focus-visible:ring-white focus-visible:ring-opacity-75"
        @click="add_role">
        Create role
    </button>

    </form>

</template>
