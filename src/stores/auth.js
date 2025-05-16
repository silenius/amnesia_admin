import { ref, toValue, unref, computed, readonly, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFetchBackend } from '@/composables/fetch.js'

export const useAuthStore = defineStore('auth', () => {
    const user = ref({})
    const is_logged = computed(() => user.value?.id !== undefined)
    
    onMounted(async () => {
        const { error, data } = await useFetchBackend('auth/me')
        if (!error) {
            user.value = data
        }
    })

    const allow = (permission, acls) => {
        const found = acls.find(
            acl => user.roles.find(
                role => acl.role.id === role.id && acl.permission.name === permission
            )
        )

        return found ? found.allow : false
    }

    const login = async(username, password) => {
        const form_data = new FormData()
         
        form_data.append('login', toValue(username))
        form_data.append('password', toValue(password))

        const { error, data } = await useFetchBackend('auth/login', {
            method: 'POST',
            body: form_data
        })

        if (!error) {
            user.value = data
        }

        return !error
    }

    const logout = async() => {
        const { error } = await useFetchBackend('auth/logout', {
            method: 'POST'
        })
        
        if (!error) {
            user.value = {}
        }

        return !error
    }

    return {
        is_logged,
        user,
        allow,
        login,
        logout
    }
})
