import { ref, unref, computed, readonly, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth.js'
import { useFetchBackend } from '@/composables/fetch.js'

export const useUsersStore = defineStore('user', () => {
    const authStore = useAuthStore()

    const users = ref([])

    const getAll = async() => { 
        try {
            const { data } = await useFetchBackend('auth/browse') 
            users.value = data.data.accounts
        } catch (error) {
            alert('ERROR')
        }
    }

    const patch = async (id, items) => {
        const data = new FormData()

        for (const [key, value] of Object.entries(items)) {
            data.append(key, value)
        }

        const { data: user_data } = await useFetchBackend(`auth/${id}`, {
            method: 'PATCH',
            body: data
        })

        await getAll()

        if (user_data.id == authStore.user.id) {
            authStore.user = { ...authStore.user, ...user_data };
        }
    }

    const deleteUser = async (id) => {
        try {
            await useFetchBackend(`auth/${id}`, {
                method: 'DELETE'
            })
        } catch (error) {
            alert('ERROR')
        }

        users.value = users.value.filter(x => x.id !== id)

        if (authStore.user.id == id) {
            authStore.logout()
        }
    }

    return {
        users,
        getAll,
        patch,
        deleteUser
    }
})
