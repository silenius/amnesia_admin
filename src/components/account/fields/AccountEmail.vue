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
    setError('email', validate(value, validators))
    return value
  }
})

</script>

<template>
  <div>
    <label>
      <p class="font-bold">Email</p>
      <input v-model.lazy="model" :class="{'border-red-500 border': errors.email}" class="focus:ring-0 focus:border-indigo-500 border-slate-300 focus:text-slate-800 focus:bg-slate-100 bg-slate-50 w-full" type="email" placeholder="" />
      <div class="text-red-500" v-if="errors.email?.length">
        Email
        <span v-for="(error, idx) in errors.email"> {{ error }} 
          <span v-if="idx < errors.email.length-1"> and </span>
        </span>
      </div>
    </label>
  </div>
</template>
