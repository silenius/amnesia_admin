<template>
  <div>
    <label>
      <p class="font-bold">Name</p>
      <p class="text-xs">Role name</p>
      <input v-model.lazy="model" :class="{'border-red-500 border': errors.name}" class="focus:ring-0 focus:border-indigo-500 border-slate-300 focus:text-slate-800 focus:bg-slate-100 bg-slate-50 w-full" type="text" placeholder="" />
      <div class="text-red-500" v-if="errors.name?.length">
        Name
        <span v-for="(error, idx) in errors.name"> {{ error }} 
          <span v-if="idx < errors.name.length-1"> and </span>
        </span>
      </div>
    </label>
  </div>
</template>

<script setup>
import { inject } from 'vue'
import { isEmpty, minLength, validate } from "../../services/validators.js"

const { errors, setError } = inject('errors')

const validators = [
  isEmpty, [minLength, {min: 4}]
]

const model = defineModel({
  set(value) {
    value = value.trim()
    setError('name', validate(value, validators))
    return value
  }
})

</script>
