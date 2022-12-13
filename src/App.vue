<script setup>
import { 
  onMounted, computed, ref, reactive, nextTick,
  onUpdated, watch, watchEffect
}  from 'vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
  </header>
  <div class="container mx-auto">
    <div class="grid gap-4">
      <RouterView />
    </div>
  </div>
</template>

<style>
</style>
