import { unref } from 'vue'
import { useFetchBackend } from './fetch.js'

const browse = async (id, opts = {}) => {
    const options = new URLSearchParams(opts)
    const { fetchData } = useFetchBackend()
    return fetchData(`${id}/browse?${options}`)
}

const paste = async (folder, ids) => {
    const data = new FormData()
    
    unref(ids).forEach((x) => data.append('ids', x))
    
    return useFetchBackend(`${folder.id}/paste`, {
        method: 'POST',
        body: data
    })
}

const createFolder = async(container, folder) => {
    const data = folder_to_formdata(folder)

    return useFetchBackend(`${container.id}/@@add_folder`, {
        method: 'POST',
        body: data
    })
}

const updateFolder = async(folder) => {
    const data = folder_to_formdata(folder)

    return useFetchBackend(`${folder.id}`, {
        method: 'PUT',
        body: data
    })
}

const getIndexCandidates = async (id) => {
    return browse(id, {
        filter_types: 'document'
    })
}

/*
const getDefaultMediaFolder = async() => {
    return useFetchBackend('folder/default_media')
}
*/

const getOrders = async (opts = {}) => {
    const options = new URLSearchParams()

    options.append('pl', opts.pl)

    if (opts.pc) {
        opts.pc.forEach(i => options.append('pc', i))
    }

    return useFetchBackend(`folder/polymorphic_orders?${options}`)
}

const destroyManyContent = async(folder, ids) => {
    const data = new FormData()
    ids.forEach((x) => data.append('ids', x))
    return useFetchBackend(`${folder.id}/bulk_delete`, {
        method: 'POST',
        body: data
    })
}

export function useFolder() {
    return {
        updateFolder,
        createFolder,
        getIndexCandidates,
        browse,
        paste,
        getOrders,
        destroyManyContent
    }
}
