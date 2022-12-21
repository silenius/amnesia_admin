<template>
  <div>
    <label class="block">
      <span>Name</span>
      <input v-model="value" class="block" type="text" placeholder="" />
      <span class="text-red-500" v-if="errors.name">
        {{ errors.name }}</span>
    </label>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRole } from '@/composables/roles.js'

const props = defineProps({
  modelValue: String
})

const emit = defineEmits(['update:modelValue'])

const { errors, validateName } = useRole()

const value = computed({
  get() {
    return props.modelValue
  },

  set(value) {
    validateName(value)
    emit('update:modelValue', value)
  }

})

</script>
