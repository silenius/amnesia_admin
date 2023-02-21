import { useFetchBackend } from '@/composables/fetch.js'
import { ref, readonly } from 'vue';

const folder = ref({})

export function useFolder() {

    const getFolder = async (id) => {
        const res = await useFetchBackend(`${id}`)
        folder.value = res

    }

    const browse = async () => {
        const res = await useFetchBackend(`${folder.value.id}/browse`)
        folder.value.contents = res
    }

    return {
        folder: readonly(folder),
        getFolder,
        browse
    }

}
