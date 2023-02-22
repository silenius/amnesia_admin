import { useFetchBackend } from '@/composables/fetch.js'
import { ref, readonly } from 'vue';

import { useContent } from '@/composables/contents.js'

const { content: folder } = useContent()

export function useFolder() {

    const contents = ref([])

    const browse = async () => {
        const res = await useFetchBackend(`${folder.value.id}/browse`)
        contents.value = res
    }

    return {
        folder: readonly(folder),
        contents: readonly(contents),
        browse
    }

}
