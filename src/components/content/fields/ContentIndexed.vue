<template>
  <div>
    <label class="block flex items-center gap-2">
      <InputCheckbox @change="(n) => value = n" :checked="value"/>
      <div class="flex flex-col">
        <span class="font-bold">Searchable</span>
        <p class="text-xs" v-if="value===true">The content will be indexed and therefore searchable.</p>
        <p class="text-xs" v-else-if="value===false">The content will <span class="font-bold">NOT</span> be searchable.</p>
        <p class="text-xs" v-else>Use default.</p>
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
    value = value === 'null' ? null : value === 'true' ? true : false
    emit('update:is_fts', value)
  }

})

</script>
