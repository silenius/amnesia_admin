<template>
  <div>
    <label class="block">
      <p class="font-bold">File</p>
      <p class="text-xs">Data file</p>
      <template v-if="file">
        <div class="max-w-64 my-4">
          <img v-if="preview" :src="preview" />
        </div>
        <button @click.prevent="cancel()" v-if="cancellable">Cancel</button>
      </template>
      <input ref="data-file" type="file" @change="onFileChange" class="block border p-2 rounded-full border-slate-300" />
      <span class="text-red-500" v-if="errors.content">
        {{ errors.content }}
      </span>
    </label>
  </div>
</template>

<script setup>
import { inject, ref, useTemplateRef, computed } from 'vue'
import { backend_url } from '../../../composables/fetch.js'

const props = defineProps({
  content: File
})

const emit = defineEmits([
  'update:content',
])

const { errors, setError } = inject('errors')
const file = inject('editable')

const input = useTemplateRef('data-file')

const is_image = computed(() => file.value.mime?.major.name == 'image')

const preview = ref(is_image.value ? backend_url(file.value.id) : false)
const cancellable = ref(false)
const cancel = () => {
  emit('update:content', null)
  preview.value = is_image.value ? backend_url(file.value.id) : false
  cancellable.value = false
  input.value.value = null
}

const onFileChange = (event) => {
  const f = event.target.files[0]
  emit('update:content', f)

  if (f.type.startsWith('image')) {
    preview.value = URL.createObjectURL(f)
  } else {
    preview.value = null
  }

  cancellable.value = true
}

</script>
