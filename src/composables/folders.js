import { useFetchBackend } from '@/composables/fetch.js'

import { useContent } from '@/composables/contents.js'

const { content: folder } = useContent()

const folder_to_formdata = (folder) => {
    const data = new FormData()

    const fields = [
      'title',
      'description',
      'exclude_nav',
      'is_fts',
      'effective',
      'expiration',
      'index_content_id',
      'polymorphic_loading',
    ]

    for (let key of fields) {
      if (folder.value[key] === null) {
        data.append(key, '')
      } else {
        data.append(key, folder.value[key])
      }
    }
    
    if (folder.value.polymorphic_loading 
        && folder.value.polymorphic_children) {
        folder.value.polymorphic_children.map(
            (c) => data.append('polymorphic_children_ids', c.id)
        )
    }

    return data
}



export function useFolder() {

    const browse = async (opts = []) => {
        const options = new URLSearchParams(opts)
        return await useFetchBackend(`${folder.value.id}/browse?${options}`)
    }

    const updateFolder = async() => {
        const data = folder_to_formdata(folder)

        return await useFetchBackend(`${folder.value.id}`, {
            method: 'PUT',
            body: data
        })
    }

    const getIndexCandidates = async () => {
      return await browse({
        filter_types: 'document'
      })
    }

    return {
        folder: folder,
        updateFolder,
        getIndexCandidates,
        browse
    }

}
