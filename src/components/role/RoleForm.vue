<script setup>
import { ref, onMounted, computed } from 'vue'

const props = defineProps(['role'])
const emit = defineEmits(['update:name'])

const description = ref('')

const name = computed({
    get() {
        return props.role
    },

    set(value) {
        emit('update:name', value)
    }
})

</script>

<template>
    <form>
        name: <input v-model="name" required type="text" />
        description: <textarea v-model="description"></textarea>
    </form>

</template>
