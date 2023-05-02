<template>
  <div>
    <label class="block">
      <span>Start date</span>

      <flat-pickr
        v-model="value"
        :config="config"
        placeholder="Select start date"
        name="starts"/>

      <button @click.prevent title="Clear" data-clear>
        <font-awesome-icon class="h-4 w-4" icon="fa-solid fa-trash-can" />
      </button>

      <span class="text-red-500" v-if="errors.starts">
        {{ errors.starts }}
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
  enableTime: true,
  time_24hr: true,
  minuteIncrement: 15
})

const props = defineProps({
  starts: String
})

const emit = defineEmits([
  'update:starts',
])

const { errors, setError } = inject('errors')

const value = computed({

  get() {
    return props.starts
  },

  set(value) {
    emit('update:starts', value)
  }

})

</script>
