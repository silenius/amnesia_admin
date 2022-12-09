import { inject }  from 'vue'
import { createFetch } from '@vueuse/core'

import { backend_url } from '@/symbols.js'

export const useBackendFetch = createFetch({
  baseUrl: 'http://home.lan/bbpf',
  options: {
    async beforeFetch({ options }) {
      options.headers.Accept = 'application/json'

      return { options }
    },
  },
  fetchOptions: {
    mode: 'cors',
  },
})

