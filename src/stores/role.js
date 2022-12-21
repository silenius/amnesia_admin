import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useRoleStore = defineStore('role', () => {

    const errors = ref({});

    const role = ref({
        name: '',
        description: ''
    })

})
