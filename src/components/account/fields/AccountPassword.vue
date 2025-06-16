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
    setError('password', validate(value, validators))
    return value
  }
})

</script>

<template>
  <div>
    <label>
      <p class="font-bold">Password</p>
      <input v-model.lazy="model" :class="{'border-red-500 border':
        errors.password}" class="focus:ring-0 focus:border-indigo-500 border-slate-300 focus:text-slate-800 focus:bg-slate-100 bg-slate-50 w-full" type="password" placeholder="" /> 
      <div class="text-red-500" v-if="errors.password?.length">
        Password
        <span v-for="(error, idx) in errors.password"> {{ error }} 
          <span v-if="idx < errors.password.length-1"> and </span>
        </span>
      </div>
    </label>
  </div>
</template>
