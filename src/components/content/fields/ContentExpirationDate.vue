<template>
  <div>
    <label class="block">
      <span>Expiration date</span>

      <flat-pickr
        v-model="value"
        :config="config"
        placeholder="Select date"
        name="expiration"/>

      <button @click.prevent title="Clear" data-clear>
        <font-awesome-icon class="h-4 w-4" icon="fa-solid fa-trash-can" />
      </button>

      <span class="text-red-500" v-if="errors.expiration">
        {{ errors.expiration }}
      </span>
    </label>
  </div>
  </template>

<script setup>
import { inject, computed, ref } from 'vue'
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

const config = ref({
  wrap: true
})

const props = defineProps({
  expiration: String
})

const emit = defineEmits([
  'update:expiration',
])

const { errors, setError } = inject('errors')

const value = computed({

  get() {
    return props.expiration
  },

  set(value) {
    emit('update:expiration', value)
  }

})

</script>
