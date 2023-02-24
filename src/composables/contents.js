import { useFetchBackend } from '@/composables/fetch.js'
import { ref, readonly } from 'vue';

const content = ref({})

export function useContent() {

    const getContent = async (id) => {
        const res = await useFetchBackend(`${id}`)
        content.value = res
    }

    const destroyContent = async (id) => {
        await useFetchBackend(`${id}`, {
            method: 'DELETE'
        })
    }

    return {
        content: readonly(content),
        getContent,
        destroyContent,
    }

}
