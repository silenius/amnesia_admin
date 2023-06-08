<script setup>
import { watchEffect, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useContent } from '@/composables/contents.js'

const props = defineProps({
  content_id: Number
})

const content = ref({})

const { getContent } = useContent()

watchEffect(async () => {
  const { data } = await getContent(props.content_id)
  content.value = data
})

</script>

<template>
  <div class="grid grid-cols-12">
    <div class="col-span-12 sticky top-0 bg-gradient-to-b from-slate-400
      to-transparent backdrop-blur-sm">
      <RouterView name="Header" :content="content" />
    </div>
    <div>
      <RouterView name="LeftSideBar" :content="content" />
    </div>
    <div class="col-span-10">
      <RouterView :content="content" v-if="content.id"
      />
    </div>
    <div>
      <RouterView name="RightSideBar" :content="content" />
    </div>
    <div class="col-span-12">
      <RouterView name="Footer" :content="content" />
    </div>
  </div>
</template>
