<script setup>
import { watchEffect } from 'vue'
import { RouterView } from 'vue-router'
import { useContent } from '@/composables/contents.js'

const props = defineProps({
    content_id: Number
})

const { getContent, content, destroyContent } = useContent()

watchEffect(async () => {
    await getContent(props.content_id)
})

</script>

<template>
    <div>
        <h1>CONTENTS</h1>
        <RouterView 
            :content="content" 
        />
    </div>

</template>
