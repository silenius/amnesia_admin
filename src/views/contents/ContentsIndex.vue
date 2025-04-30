<script setup>
import { watchEffect, ref, toRefs } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useContent } from '../../composables/useContent.js'

const props = defineProps({
  content_id: {
    type: Number,
    required: true
  }
})

const { content_id } = toRefs(props)

const { content } = await useContent(content_id)

</script>

<template>
  <div class="flex flex-row">
    <RouterView v-slot="{ Component }">
      <Suspense>
        <component class="m-4 grow" :content="content" :is="Component" />
        <template #fallback>
          Loading ...
        </template>
      </Suspense>
    </RouterView>

    <aside class="basis-0 backdrop-blur-xs shadow-gray-900 shadow-md bg-gray-700">
      <RouterView 
        name="RightSideBar" 
        v-if="content_id"
      />
    </aside>
  </div>
</template>
