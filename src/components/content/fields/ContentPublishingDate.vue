<template>
  <div>
    <label class="block">
      <input type="checkbox" v-model="enabled" />
      <span>Publishing date</span>
      <input v-model="value" v-if="enabled" type="datetime-local" />
      <span class="text-red-500" v-if="errors.effective">
        {{ errors.effective }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { inject, watch, computed, ref } from 'vue'

const props = defineProps({
  effective: String
})

const emit = defineEmits([
  'update:effective',
])

const { errors, setError } = inject('errors')

const enabled = ref(false)

const value = computed({

  get() {
    return props.effective
  },

  set(value) {
    emit('update:effective', value)
  }

})

</script>
