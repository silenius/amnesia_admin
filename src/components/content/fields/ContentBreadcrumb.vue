<template>
  <div>
    <label class="block flex items-center gap-2">
      <InputCheckbox @change="(n) => value = n" :values="yes_no_unknown" :checked="value"/>
      <div class="flex flex-col">
        <span class="font-bold">Breadcrumb</span>
        <p class="text-xs" v-if="value===true">A breadcrumb will be displayed.</p>
        <p class="text-xs" v-else-if="value===false">A breadcrumb will <span class="font-bold">NOT</span> be displayed.</p>
        <p class="text-xs" v-else>Use default</p>
      </div>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import InputCheckbox from '@/components/form/InputCheckbox.vue'
import { yes_no_unknown } from '@/components/form/InputCheckboxDefaults.js'

const props = defineProps({
  breadcrumb: {
    type: Boolean,
    default: null
  }
})

const emit = defineEmits([
  'update:breadcrumb',
])

const value = computed({

  get() {
    return props.breadcrumb
  },

  set(value) {
    value = value === 'null' ? null : value === 'true' ? true : false
    emit('update:breadcrumb', value)
  }

})

</script>
