<template>
  <div>
    <label class="block">
      <span>Description</span>
      <input v-model.trim="value" class="block" type="text" placeholder="" />
      <span class="text-red-500" v-if="errors.description">
          {{ errors.description }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { ref, inject, computed } from 'vue'

const props = defineProps({
    description: String
})

const emit = defineEmits([
    'update:description'
])

const { errors, setError } = inject('errors')

const value = computed({

    get() {
        return props.description
    },

    set(value) {
//        setError('description', validateDescription(value))
        emit('update:description', value)
    }

})

</script>
