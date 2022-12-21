<template>
  <div>
    <label class="block">
      <span>Description</span>
      <input @input="$emit('update:modelValue', $event.target.value)" class="block" type="text" placeholder="" />
    </label>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('');

const validate = () => {

}

</script>
