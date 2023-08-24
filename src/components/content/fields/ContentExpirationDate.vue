<template>
  <div>
    <label>
      <p class="font-bold">Expiration date</p>
      <p class="text-xs">When this date is reached, the content will no longer
        be visible in listings and searches.</p>

      <flat-pickr
        class="p-2 border-slate-300 bg-slate-50"
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
  wrap: true,
  altInput: true,
  altFormat: 'F j, Y',
  dateFormat: 'Z'
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
