<template>
  <div class="mb-4">
    <label>
      <p class="font-bold">Body</p>
      <p class="text-xs">The content of the document</p>
      <!-- <EditorTinyMCE v-model="value" /> -->
      <EditorTipTap v-model:content="value" />
      <span class="text-red-500" v-if="errors.body">
        {{ errors.body }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
// import EditorTinyMCE from '@/components/content/fields/EditorTinyMCE.vue'
import EditorTipTap from '@/components/content/fields/EditorTipTap.vue'
import { useContent } from '@/composables/contents.js'

const props = defineProps({
  body: String
})

const emit = defineEmits([
  'update:body',
])

const { errors, setError } = inject('errors')


const { validateTitle } = useContent()

const value = computed({

  get() {
    return props.body
  },

  set(value) {
    setError('body', validateTitle(value))
    emit('update:body', value)
  }

})

</script>
