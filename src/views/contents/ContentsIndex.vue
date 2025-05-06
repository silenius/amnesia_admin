<script setup>
import { toRefs } from 'vue'
import { RouterView } from 'vue-router'

const props = defineProps({
  content_id: {
    type: Number,
    required: true
  }
})

const { content_id } = toRefs(props)
</script>

<template>
  <div class="flex flex-row" v-if="content_id">
    <RouterView v-slot="{ Component }">
      <component class="m-4 grow" :content_id="content_id" :is="Component" />
    </RouterView>

    <aside class="basis-0 backdrop-blur-xs shadow-gray-900 shadow-md bg-gray-700">
      <RouterView 
        name="RightSideBar" 
      />
    </aside>
  </div>
</template>
