<template>
  <font-awesome-icon @click="cycle" :class="[class_, 'hover:cursor-pointer h-8 w-8']" :icon="icon" />
</template>

<script setup>
  import { ref, computed, watch, unref } from 'vue'
  import { yes_no } from '@/components/form/InputCheckboxDefaults.js'

  const props = defineProps({
    values: {
      type: Object,
      default: yes_no
    },
    checked: {
      type: Boolean,
      default: null
    },
  })

  const emit = defineEmits(['change'])

  const value = ref(props.checked)
  const class_ = computed( () => props.values[value.value].class_)
  const icon = computed( () => props.values[value.value].icon)

  const cycle = () => {
    const keys = Object.keys(props.values)
    const idx = keys.indexOf(value.value?.toString())
    value.value = idx+1 == keys.length ? keys[0] : keys[idx+1]
  }

  watch(value, () => emit('change', unref(value)))

</script>
