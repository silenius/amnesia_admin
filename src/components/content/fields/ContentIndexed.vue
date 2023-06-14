<template>
  <div>
    <label class="block">
      <input class="align-middle mr-2" v-model="value" type="checkbox" />
      <span class="font-bold">Indexed</span>
      <p class="text-xs">If selected, the content will be searchable.</p>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  is_fts: Boolean
})

const emit = defineEmits([
  'update:is_fts',
])

const value = computed({

  get() {
    return props.is_fts
  },

  set(value) {
    emit('update:is_fts', value)
  }

})

</script>
