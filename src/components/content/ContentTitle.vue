<script setup>
import { computed } from 'vue'

const props = defineProps({
    modelValue: {
        type: String,
        required: true
    }
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>

<template>
    <slot name="before-input"></slot>
    <input v-model="value" />
    <slot name="after-input"></slot>
</template>
