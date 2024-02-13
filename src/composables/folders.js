import { unref } from 'vue'
import { useFetchBackend } from '@/composables/fetch.js'

const folder_to_formdata = (folder_data) => {

    const folder = unref(folder_data)
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
        'default_limit',
    ]

    for (let key of fields) {
        const value = folder[key]

        if (value !== undefined) {
            data.append(key, value === null ? '' : value)
        } else {
            console.log('===> Skipping ', key)
        }
    }

    if (folder.polymorphic_loading 
        && folder.polymorphic_children) {
        folder.polymorphic_children.forEach(
            c => data.append('polymorphic_children_ids', c.id)
        )
    }

    if (folder.default_order) {
        data.append('default_order', JSON.stringify(folder.default_order))
    }

    if (folder.props) {
        data.append('props', JSON.stringify(folder.props))
    }

    if (folder.acls) {
        data.append('acls', JSON.stringify(folder.acls.map(x => {
            return {
                allow: x.allow,
                role_id: x.role.id,
                permission_id: x.permission.id
            }
        })))
    }

    return data
}

const browse = async (id, opts = {}) => {
    const options = new URLSearchParams(opts)
    return useFetchBackend(`${id}/browse?${options}`)
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

const getLineage = async (folder_id) => {
    return useFetchBackend(`${folder_id}/lineage`)
}

const getDefaultMediaFolder = async() => {
    return useFetchBackend('folder/default_media')
}

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
        getDefaultMediaFolder,
        browse,
        paste,
        getOrders,
        getLineage,
        destroyManyContent
    }
}
