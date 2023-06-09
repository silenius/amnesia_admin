<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-12 sticky top-0 bg-gray-800 backdrop-blur-sm text-gray-300">
      <RouterView name="Header" />
    </div>
    <div>
      <RouterView name="LeftSideBar" />
    </div>
    <div class="col-span-10">
      <RouterView />
    </div>
    <div>
      <RouterView name="RightSideBar" />
    </div>
    <div class="col-span-12">
      <RouterView name="Footer" />
    </div>
  </div>
</template>

<style>
</style>
