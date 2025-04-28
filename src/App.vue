<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-12 border-b-1 z-50 shadow-gray-900 shadow-md border-gray-900 row-span-3 sticky top-0 bg-gray-800 backdrop-blur-xs text-gray-300">
      <RouterView name="Header" />
    </div>
    <div class="col-span-12">
      <div class="flex flex-row">
        <aside class="basis-0 backdrop-blur-xs shadow-gray-900 shadow-md bg-gray-700">
          <RouterView class="p-2 md:p-4" name="LeftSideBar" />
        </aside>
        <div class="self-start grow overflow-scroll ">
          <RouterView name="default" v-slot="{ Component }">
            <Suspense>
              <component :is="Component" />
              <template #fallback>
                Loading ...
              </template>
            </Suspense>
          </RouterView>
        </div>
        <aside class="basis-0 fixed top-0 backdrop-blur-xs shadow-gray-900 shadow-md bg-gray-700">
          <RouterView class="p-2 md:p-4" name="RightSideBar" />
        </aside>
      </div>
    </div>
    <div class="col-span-12">
      <RouterView name="Footer" />
    </div>
  </div>
</template>

<style>
</style>
