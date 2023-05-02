<template>
  <div>
    <label class="block">
      <span>End date</span>

      <flat-pickr
        v-model="value"
        :config="config"
        placeholder="Select end date"
        name="ends"/>

      <button @click.prevent title="Clear" data-clear>
        <font-awesome-icon class="h-4 w-4" icon="fa-solid fa-trash-can" />
      </button>

      <span class="text-red-500" v-if="errors.ends">
        {{ errors.ends }}
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
  ends: String
})

const emit = defineEmits([
  'update:ends',
])

const { errors, setError } = inject('errors')

const value = computed({

  get() {
    return props.ends
  },

  set(value) {
    emit('update:ends', value)
  }

})

</script>
