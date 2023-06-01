<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
  </header>
  <div class="text-slate-600 bg-gradient-to-r from-cyan-500 to-blue-500 h-screen">
    <div class="container mx-auto bg-stone-50 px-8 h-screen">
      <div class="grid gap-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style>
</style>
