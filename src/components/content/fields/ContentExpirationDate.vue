<template>
  <div>
    <label class="block">
      <input type="checkbox" v-model="enabled" />
      <span>Expiration date</span>
      <input v-model="value" v-if="enabled" type="datetime-local" />
      <span class="text-red-500" v-if="errors.expiration">
        {{ errors.expiration }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { inject, watch, computed, ref } from 'vue'

const props = defineProps({
  expiration: String
})

const enabled = ref(false)

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
