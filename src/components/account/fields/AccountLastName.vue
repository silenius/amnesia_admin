<script setup>
import { inject } from 'vue'
import { isEmpty, minLength, validate } from "../../../services/validators.js"

const { errors, setError } = inject('errors')

const validators = [
  isEmpty, [minLength, {min: 4}]
]

const model = defineModel({
  set(value) {
    value = value.trim()
    setError('last_name', validate(value, validators))
    return value
  }
})

</script>

<template>
  <div>
    <label>
      <p class="font-bold">Last name</p>
      <input v-model.lazy="model" :class="{'border-red-500 border': errors.last_name}" class="focus:ring-0 focus:border-indigo-500 border-slate-300 focus:text-slate-800 focus:bg-slate-100 bg-slate-50 w-full" type="text" placeholder="" />
      <div class="text-red-500" v-if="errors.last_name?.length">
        Last name
        <span v-for="(error, idx) in errors.last_name"> {{ error }} 
          <span v-if="idx < errors.last_name.length-1"> and </span>
        </span>
      </div>
    </label>
  </div>
</template>
