<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-12 border-b-1 z-50 shadow-gray-900 shadow-md border-gray-900 row-span-3 sticky top-0 bg-gray-800 backdrop-blur-sm text-gray-300">
      <RouterView name="Header" />
    </div>
    <div class="col-span-12">
      <div class="flex flex-col">
        <aside class="basis-0 p-2 md:p-4 fixed w-32 md:w-48 bg-gray-700">
          <RouterView name="LeftSideBar" />
        </aside>
        <div class="grow overflow-scroll ml-32 md:ml-48">
          <RouterView />
        </div>
        <div class="basis-0">
          <RouterView name="RightSideBar" />
        </div>
      </div>
    </div>
    <div class="col-span-12">
      <RouterView name="Footer" />
    </div>
  </div>
</template>

<style>
</style>
