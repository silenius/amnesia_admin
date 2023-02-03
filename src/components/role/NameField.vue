<template>
  <div>
    <label class="block">
      <span>Name</span>
      <input v-model.trim="value" class="block" type="text" placeholder="" />
      <span class="text-red-500" v-if="errors.name">
        {{ errors.name }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRole } from '@/composables/roles.js'

const props = defineProps({
  name: String
})

const emit = defineEmits([
  'update:name'
])

const { errors, validateName } = useRole()

const value = computed({

  get() {
    return props.name
  },

  set(value) {
    validateName(value)
    emit('update:name', value)
  }

})

</script>
