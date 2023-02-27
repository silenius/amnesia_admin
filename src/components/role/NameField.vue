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
import { inject, computed } from 'vue'
import { useRole } from '@/composables/roles.js'

const props = defineProps({
  name: String
})

const emit = defineEmits([
  'update:name',
])

const { errors, setError } = inject('errors')

const { validateName } = useRole()

const value = computed({

  get() {
    return props.name
  },

  set(value) {
    setError('name', validateName(value))
    emit('update:name', value)
  }

})

</script>
