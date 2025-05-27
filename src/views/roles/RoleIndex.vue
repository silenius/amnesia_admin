<script setup>

import { ref, toRefs, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useRole } from '../../composables/useRole.js'

const props = defineProps({
  role_id: {
    type: Number,
    required: true
  }
})

const { role_id } = toRefs(props)
const { role } = useRole(role_id)

</script>

<template>
  <div v-if="role">
    ROLE / {{ role.name }}
    <RouterView 
      :role="role"
    />
  </div>
</template>
