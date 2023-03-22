<script setup>

import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useRole } from '@/composables/roles.js'

const props = defineProps({
    role_id: Number
})

const role = ref({})

const { getRole } = useRole()

onMounted( async () => {
  const { data } = await getRole(props.role_id)
  role.value = data
})

</script>

<template>
  <div>
    ROLE / {{ role.name }}
    <RouterView 
      :role="role"
      v-if="role" />
  </div>
</template>
