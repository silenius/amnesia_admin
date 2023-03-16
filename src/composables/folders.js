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
    ]

    for (let key of fields) {
      if ((folder[key] === null) || (folder[key] === undefined)) {
        data.append(key, '')
      } else {
        data.append(key, folder[key])
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

    if (folder.acls) {
      data.append('acls', JSON.stringify(folder.acls))
    }

    return data
}

const browse = async (id, opts = []) => {
    const options = new URLSearchParams(opts)
    return useFetchBackend(`${id}/browse?${options}`)
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

const getIndexCandidates = async () => {
  return browse({
    filter_types: 'document'
  })
}

const getOrders = async (opts = {}) => {
  const options = new URLSearchParams()
  
  options.append('pl', opts.pl)

  if (opts.pc) {
    opts.pc.forEach(i => options.append('pc', i))
  }
  
  return useFetchBackend(`folder/polymorphic_orders?${options}`)
}


export function useFolder() {
  return {
      updateFolder,
      createFolder,
      getIndexCandidates,
      browse,
      getOrders
  }
}
