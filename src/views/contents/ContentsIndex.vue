<script setup>
import { RouterLink, RouterView } from 'vue-router'

const props = defineProps({
    content_id: Number
})

const { getRole, role } = useRole()

onMounted( () => {
    getRole(props.role_id)
})


</script>

<template>
    <div>
        <h1>CONTENTS</h1>
        <RouterView />
    </div>

</template>
