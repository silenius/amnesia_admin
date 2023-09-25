import { ref, unref, computed, readonly, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useFetchBackend } from '@/composables/fetch.js'

export const useAuthStore = defineStore('auth', () => {
    const user = ref({})
    const router = useRouter()

    const is_logged = computed(() => user.value?.id !== undefined)

    onMounted(async () => {
        const { data } = await me()
        user.value = data
    })

    const me = async () => useFetchBackend('auth/me')

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

        data.append('login', unref(username))
        data.append('password', unref(password))

        try {
            const { data: user_data } = await useFetchBackend('auth/login', {
                method: 'POST',
                body: data
            })

            user.value = user_data

            await router.push('/')
        } catch (error) {
            // TODO
            alert('ERROR')
        }
    }

    const logout = async() => {
        await useFetchBackend('auth/logout', {
            method: 'POST'
        })
        user.value = {}
        router.push('/')
    }

    return {
        is_logged,
        user,
        allow,
        login,
        logout
    }
})
