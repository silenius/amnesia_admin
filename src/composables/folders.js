import { useFetchBackend } from '@/composables/fetch.js'
import { ref, readonly } from 'vue';

import { useContent } from '@/composables/contents.js'

const { content: folder } = useContent()

const folder_to_formdata = (folder) => {
    const data = new FormData()

    data.append('title', folder.value.title)
    data.append('description', folder.value.description)
    data.append('exclude_nav', folder.value.exclude_nav)
    data.append('is_fts', folder.value.is_fts)
    data.append('effective', folder.value.effective)
    data.append('expiration', folder.value.expiration)

    return data
}



export function useFolder() {

    const contents = ref([])

    const browse = async () => {
        const res = await useFetchBackend(`${folder.value.id}/browse`)
        contents.value = res
    }

    const updateFolder = async() => {
        const data = folder_to_formdata(folder)

        return await useFetchBackend(`${folder.value.id}`, {
            method: 'PUT',
            body: data
        })
    }

    return {
        folder: folder,
        contents: readonly(contents),
        updateFolder,
        browse
    }

}
