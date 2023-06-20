<template>
  <font-awesome-icon @click="cycle" :class="[class_, 'hover:cursor-pointer h-8 w-8']" :icon="icon" />
</template>

<script setup>
  import { ref, computed, watch, unref } from 'vue'

  const props = defineProps({
    icons: {
      type: Object,
      default: {
        true: 'fa-solid fa-square-check',
        false: 'fa-solid fa-square-xmark',
        null: 'fa-solid fa-square-virus'
      }
    },
    default: {
      type: Boolean,
      default: null
    },
    cls: {
      type: Object,
      default: {
        true: 'text-green-500 hover:text-green-600',
        false: 'text-red-500 hover:text-red-600',
        null: 'text-sky-500 hover:text-sky-600',
      }
    }
  })

  const emit = defineEmits(['change'])

  const cycle = () => {
    const keys = Object.keys(props.icons)
    const idx = keys.indexOf(value.value?.toString())
    value.value = idx+1 == keys.length ? keys[0] : keys[idx+1]
  }

  const value = ref(props.default)
  const class_ = computed( () => props.cls[value.value])
  const icon = computed( () => props.icons[value.value])

  watch(value, () => emit('change', unref(value)))

</script>
