<script setup>
import { watch, watchEffect, isRef, isReactive, ref, toRefs, onUnmounted, onMounted, onBeforeMount, onUpdated,
  onBeforeUpdate } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { useContent } from '../../composables/useContent.js'

const props = defineProps({
  content_id: {
    type: Number,
    required: true
  }
})

const { content_id } = toRefs(props)

onUnmounted(() => console.log('UNMOUNTED'))
onMounted(() => {
  console.log('MOUNTED')
  console.log(content_id)
})
onBeforeMount(() => {
  console.log('BEFORE MOUNTED')
  console.log(content_id)
})
onUpdated(() => { 
  console.log('UPDATED') 
  console.log(content_id)
})
onBeforeUpdate(() => console.log('BEFORE UPDATED'))

const { content } = await useContent(content_id)

watch(content, () => console.log('CONTENT CHANGED'))

</script>

<template>
  <div class="flex flex-row">
    <RouterView v-slot="{ Component }">
        <component class="m-4 grow" :content="content" :is="Component" />
    </RouterView>

    <aside class="basis-0 backdrop-blur-xs shadow-gray-900 shadow-md bg-gray-700">
      <RouterView 
        name="RightSideBar" 
        v-if="content_id"
      />
    </aside>
  </div>
</template>
