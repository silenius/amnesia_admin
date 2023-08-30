<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-12 border-b-1 shadow-gray-900 shadow-md border-gray-900 row-span-3 sticky top-0 bg-gray-800 backdrop-blur-sm text-gray-300">
      <RouterView name="Header" />
    </div>
    <div class="col-span-12 flex flex-row">
        <aside class="basis-0 p-4 bg-gray-700">
          <RouterView name="LeftSideBar" />
        </aside>
        <div class="grow relative">
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
