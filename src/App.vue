<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-12 border-b-1 shadow-cyan-900/50 shadow-lg border-gray-900 row-span-3 sticky top-0 bg-gray-800 backdrop-blur-sm text-gray-300">
      <RouterView name="Header" />
    </div>
    <div class="col-span-12 flex flex-row">
        <div class="basis-0 p-4 bg-gray-700">
          <RouterView name="LeftSideBar" />
        </div>
        <div class="grow">
          <RouterView />
        </div>
        <div class="basis-0">
          <RouterView name="RightSideBar" />
        </div>
    </div>
    <div class="col-span-12">
      <RouterView name="Footer" />
    </div>
  </div>
</template>

<style>
</style>
