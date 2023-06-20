<template>
  <div>
    <label class="block flex items-center gap-2">
      <InputCheckbox @change="(n) => value = n" :default="value"/>
      <div class="flex flex-col">
        <span class="font-bold">Indexed</span>
        <p class="text-xs">If selected, the content will be searchable.</p>
      </div>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import InputCheckbox from '@/components/form/InputCheckbox.vue'

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
