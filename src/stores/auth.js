import { ref, toValue, unref, computed, readonly, onMounted } from 'vue'
import { defineStore } from 'pinia'
import { useFetchBackend } from '@/composables/fetch.js'

export const useAuthStore = defineStore('auth', () => {
    const user = ref({})
    const is_logged = computed(() => user.value?.id !== undefined)
    
    onMounted(async () => {
        const { data, error, fetchData } = useFetchBackend()
        await fetchData('auth/me')

        if (!error.value) {
            user.value = data.value
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
        const data = new FormData()
         
        const { data: userData, error, fetchData } = useFetchBackend()

        data.append('login', toValue(username))
        data.append('password', toValue(password))

        await fetchData('auth/login', {
            method: 'POST',
            body: data
        })

        if (!error.value) {
            user.value = userData.value
            return true
        }

        return false
    }

    const logout = async() => {
        const { error, fetchData } = useFetchBackend()

        await fetchData('auth/logout', {
            method: 'POST'
        })
        
        if (!error.value) {
            user.value = {}
            return true
        }

        return false
    }

    return {
        is_logged,
        user,
        allow,
        login,
        logout
    }
})
