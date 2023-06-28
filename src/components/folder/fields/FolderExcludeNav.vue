<template>
  <div>
    <label class="block flex items-center gap-2">
      <InputCheckbox @change="(n) => value = n" :checked="value"/>
      <div class="flex flex-col">
        <span class="font-bold">Exclude from navigation</span>
        <p class="text-xs" v-if="value===true">The content will <span class="font-bold">NOT</span> appear in the navigations.</p>
        <p class="text-xs" v-else-if="value===false">The content will appear in the navigations.</p>
        <p class="text-xs" v-else>Use default.</p>
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

  set(value) {
    value = value === 'null' ? null : value === 'true' ? true : false
    emit('update:exclude_nav', value)
  }

})

</script>
