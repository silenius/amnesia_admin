import { unref } from 'vue'
import { useFetchBackend } from '@/composables/fetch.js'

const document_to_formdata = (document_data) => {

    const document = unref(document_data)
    const data = new FormData()

    const fields = [
      'title',
      'description',
      'exclude_nav',
      'is_fts',
      'effective',
      'expiration',
      'breadcrumb',
      'body'
    ]

    for (let key of fields) {
      if ((document[key] === null) || (document[key] === undefined)) {
        data.append(key, '')
      } else {
        data.append(key, document[key])
      }
    }
    
    if (document.acls) {
      data.append('acls', JSON.stringify(document.acls.map(x => {
        return {
          allow: x.allow,
          role_id: x.role.id,
          permission_id: x.permission.id
        }
      })))
    }

    if (document.banner_image) {
        data.append('banner_image', document.banner_image.id)
    }

    return data
}

const createDocument = async(container, document) => {
    const data = document_to_formdata(document)

    return useFetchBackend(`${container.id}/@@add_document`, {
        method: 'POST',
        body: data
    })
}

const updateDocument = async(document) => {
    const data = document_to_formdata(document)

    return useFetchBackend(`${document.id}`, {
        method: 'PUT',
        body: data
    })
}

export function useDocument() {
  return {
      updateDocument,
      createDocument
  }
}
