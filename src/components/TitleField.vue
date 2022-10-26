<template>
    <input 
        type="text" 
        placeholder="Title" 
        autocomplete="off" 
        v-model="input" 
        @keyup="validate" 
        @blur="validate"
    />
</template>

<script setup>
    import { ref, computed } from "vue";
    import useValidators from '@/modules/Validators';
    
    const input = ref(null);
    let error = ref('');
    const { isEmpty, minLength } = useValidators();

    const validate = () => {
        error = 'YES';
        console.log('coucou');
    }
</script>
