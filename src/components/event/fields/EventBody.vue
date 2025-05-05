<template>
  <div>
    <label>
      <p class="font-bold">Body</p>
      <p class="text-xs">The content of the event</p>
      <EditorTipTap v-model:content="value" />
      <span class="text-red-500" v-if="errors.body">
        {{ errors.body }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import EditorTipTap from '@/components/content/fields/EditorTipTap.vue'

const props = defineProps({
  body: String
})

const emit = defineEmits([
  'update:body',
])

const { errors, setError } = inject('errors')

const value = computed({

  get() {
    return props.body
  },

  set(value) {
    emit('update:body', value)
  }

})

</script>
