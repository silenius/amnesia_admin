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
        folder.value.polymorphic_children.forEach(
            c => data.append('polymorphic_children_ids', c.id)
        )
    }

    if (folder.value.default_order) {
      data.append('default_order', JSON.stringify(folder.value.default_order))
    }

    if (folder.value.acls) {
      data.append('acls', JSON.stringify(folder.value.acls))
    }


    return data
}

const browse = async (opts = []) => {
    const options = new URLSearchParams(opts)
    return useFetchBackend(`${folder.value.id}/browse?${options}`)
}

const updateFolder = async() => {
    const data = folder_to_formdata(folder)

    return useFetchBackend(`${folder.value.id}`, {
        method: 'PUT',
        body: data
    })
}

const getIndexCandidates = async () => {
  return browse({
    filter_types: 'document'
  })
}

const getOrders = async (id=null, opts = {}) => {
  const options = new URLSearchParams()
  
  options.append('pl', opts.pl)

  if (opts.pc) {
    opts.pc.forEach(i => options.append('pc', i))
  }
  
  let url=''

  if (id) {
    url=id
  } else {
    url='folder'
  }

  return useFetchBackend(`${url}/polymorphic_orders?${options}`)
}


export function useFolder() {
  return {
      folder: folder,
      updateFolder,
      getIndexCandidates,
      browse,
      getOrders
  }
}
