<script setup>
import { watch, onMounted, onUpdated } from 'vue'
import { RouterView } from 'vue-router'
import { useFolder } from '@/composables/folders.js'

const props = defineProps({
    content_id: Number
})

const { getFolder, folder } = useFolder()

onMounted(async () => {
    await getFolder(props.content_id)
})

watch(() => props.content_id, async () => {
    await getFolder(props.content_id)
})

</script>

<template>
    <div>
        <h1>CONTENTS</h1>
        <RouterView :content="folder" />
    </div>

</template>
