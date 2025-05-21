<template>
  <div>
    <label>
      <p class="font-bold">Description</p>
      <p class="text-xs">Used in item listings and search results.</p>
      <textarea v-model.lazy="model" class="focus:ring-0
        focus:border-indigo-500 border-slate-300 focus:text-slate-800
        focus:bg-slate-100 bg-slate-50 w-full" type="text" placeholder=""></textarea>
    </label>
  </div>
</template>

<script setup>
const model = defineModel({
  set(value) {
    return value.trim()
  }
})
</script>
