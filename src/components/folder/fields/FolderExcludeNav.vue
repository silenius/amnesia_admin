<template>
  <div>
    <label class="block flex items-center gap-2">
      <InputCheckbox @change="(n) => value = n" :default="value"/>
      <div class="flex flex-col">
        <span class="font-bold">Exclude from navigation tree</span>
        <p class="text-xs">If selected, this item will not appear in the navigation tree.</p>
      </div>
    </label>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import InputCheckbox from '@/components/form/InputCheckbox.vue'

const props = defineProps({
  exclude_nav: Boolean
})

const emit = defineEmits([
  'update:exclude_nav',
])

const value = computed({

  get() {
    return props.exclude_nav
  },

  set(newValue) {
    emit('update:exclude_nav', newValue)
  }

})

</script>
