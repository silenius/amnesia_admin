import { unref } from 'vue'
import { useFetchBackend } from '@/composables/fetch.js'

const file_to_formdata = (file_data) => {

    const file = unref(file_data)
    const data = new FormData()

    const fields = [
        'title',
        'description',
        'exclude_nav',
        'is_fts',
        'effective',
        'expiration',
        'breadcrumb',
        'content'
    ]

    for (let key of fields) {
        if ((file[key] === null) || (file[key] === undefined)) {
            data.append(key, '')
        } else {
            data.append(key, file[key])
        }
    }

    if (file.acls) {
        data.append('acls', JSON.stringify(file.acls.map(x => {
            return {
                allow: x.allow,
                role_id: x.role.id,
                permission_id: x.permission.id
            }
        })))
    }

    if (file.banner_image) {
        data.append('banner_image', file.banner_image.id)
    }

    return data
}

const createFile = async(container, file) => {
    const data = file_to_formdata(file)

    return useFetchBackend(`${container.id}/@@add_file`, {
        method: 'POST',
        body: data
    })
}

const updateFile = async(file) => {
    const data = file_to_formdata(file)

    return useFetchBackend(`${file.id}`, {
        method: 'PUT',
        body: data
    })
}

export function useFile() {
    return {
        updateFile,
        createFile
    }
}
