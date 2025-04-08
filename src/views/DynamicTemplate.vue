<template>
  <component :is="component" />
</template>

<script setup>
import {
  watch,
  shallowRef,
  defineAsyncComponent,
} from 'vue'

const props = defineProps({
  tmpl: {
    type: String,
    required: false
  },
  mod: {
    type: Object,
    required: false
  }
})

const component = shallowRef()

watch(
  [() => props.tmpl, () => props.mod],
  () => component.value = defineAsyncComponent({
    loader: () => {
      if (props.mod) {
        return props.mod
      }

      let mod

      try {
        if (props.tmpl.indexOf(':') === -1) {
          mod = import(props.tmpl)
        } else {
          throw new Error('===>>> Invalid template')
        }
      } catch (e) {
        mod = import('./TemplateNotFound.vue')
      }

      return mod
    }
  }),
  { immediate: true }
)
</script>
