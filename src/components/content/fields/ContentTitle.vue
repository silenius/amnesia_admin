<template>
  <div>
    <label>
      <p class="font-bold">Title</p>
      <p class="text-xs">Main content title</p>
      <input v-model="model" :class="{'border-red-500 border': errors.title}" class="focus:ring-0 focus:border-indigo-500 border-slate-300 focus:text-slate-800 focus:bg-slate-100 bg-slate-50 w-full" type="text" placeholder="" />
      <div class="text-red-500" v-if="errors.title?.length">
        Title 
        <span v-for="(error, idx) in errors.title"> {{ error }} 
          <span v-if="idx < errors.title.length-1"> and </span>
        </span>
      </div>
    </label>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'
import { useContent } from '@/composables/contents.js'
import { isEmpty, minLength, validate } from "../../../services/validators.js"

const { errors, setError } = inject('errors')

const validators = [
  isEmpty, [minLength, {min: 4}]
]

const model = defineModel({
  set(value) {
    setError('title', validate(value.trim(), validators))
    return value
  }
})

</script>
