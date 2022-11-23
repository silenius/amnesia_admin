<script setup>
    const props = defineProps({
        name: String, 
        age: {
            type: Number,
            default: 0,
            required: false
        }, 
        fontsize: Number,
        title: {
            type: String,
            required: true
        }
    })
    const events = defineEmits({
        enlargeText: (n) => {
            if (n === 1) {
                console.log('OK')
                return true
            } else {
                console.log('FAIL')
                return false
            }
        }
    })
</script>

<template>
<h1 :style="{ fontSize: fontsize + 'em' }"> 
    Hello {{ name }}, you are {{ age }} years old 
    <button @click="$emit('enlargeText', 1)">enlarge</button>
</h1>
        <slot />
    <b> 
    {{ title }}
        </b>
</template>
