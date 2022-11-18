<script setup>
    const props = defineProps([
        name: String, 
        age: Number, 
        fontsize: Number
    ])
    const events = defineEmits(['enlarge-text'])
</script>

<template>
<h1 :style="{ fontSize: fontsize + 'em' }"> 
    Hello {{ name }}, you are {{ age }} years old 
    <button @click="$emit('enlarge-text')">enlarge</button>
</h1>
        <slot />
</template>
