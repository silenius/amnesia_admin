<template>
  <font-awesome-icon @click="next" :class="[class_, 'hover:cursor-pointer text-white h-8 w-8 align-middle']" :icon="icon" />
</template>


<script setup>

  import { ref } from 'vue'

  const props = defineProps({
    icons: {
      type: Object,
      default: {
        true: 'fa-solid fa-check',
        false: 'fa-solid fa-xmark',
        undefined: 'fa-regular fa-circle'
      }
    },
    default: {
      type: Boolean,
      default: undefined
    },
    cls: {
      type: Object,
      default: {
        true: 'bg-green-500 bg-green-600',
        false: 'bg-red-500 hover:bg-red-600',
        undefined: 'bg-sky-500 bg-sky-600',
      }
    }
  })

  const next = () => {
    let found = false

    for (const key of Object.keys(props.icons)) {
      console.log('VALUE ', value.value)
      console.log('KEY ', key)
      if (found) {
        value.value = key
        break
      }
      if (key === value.value) {
        found = true
      }
    }
  }

  const value = ref(props.default)
  const class_ = props.cls[value.value]
  const icon = props.icons[value.value]

</script>
