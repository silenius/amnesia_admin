<template>
  <div>
    <label>
      <p class="font-bold">Description</p>
      <p class="text-xs">Role description</p>
      <input v-model.lazy="model" :class="{'border-red-500 border': errors.description}" class="focus:ring-0 focus:border-indigo-500 border-slate-300 focus:text-slate-800 focus:bg-slate-100 bg-slate-50 w-full" type="text" placeholder="" />
      <div class="text-red-500" v-if="errors.description?.length">
        Description
        <span v-for="(error, idx) in errors.description"> {{ error }} 
          <span v-if="idx < errors.description.length-1"> and </span>
        </span>
      </div>
    </label>
  </div>
</template>

<script setup>
import { inject } from 'vue'

const { errors } = inject('errors')

const model = defineModel({
  set(value) {
    return value.trim()
  }
})

</script>
