import { computed, ref } from 'vue'

export function createBrowser(oid, browse) {
    const folder_id = oid
    const meta = ref({})
    const data = ref([])

    const c_limit = computed(() => meta.value?.limit)
    const c_offset = computed(() => {
        const v = parseInt(meta.value?.offset)
        return isNaN(v) ? 0 : v
    })

    const c_sort_folder_first = computed(() => {
        const v = meta.value?.sort_folder_first
        return typeof v == 'boolean' ? v : true
    })

    const c_filter_types = computed(() => {
        const v = meta.value?.filter_types

        if (Array.isArray(v) && v.length > 0) {
            return v
        }

        return false
    })

    const reload = async ({
        offset=c_offset.value, 
        limit=c_limit.value,
        sort_folder_first=c_sort_folder_first.value,
        filter_types=c_filter_types.value
    } = {}
    ) => {
        const p = [
            ['sort_folder_first', sort_folder_first],
            ['offset', offset],
        ]

        if (limit) {
            p.push(['limit', limit])
        }

        if (filter_types) {
            p.push(['filter_types', filter_types])
        }

        const { data: res } = await browse(folder_id.value, p)

        data.value = res.data
        meta.value = res.meta
    }

    return {
        meta,
        data,
        reload,
        limit: c_limit,
        offset: c_offset,
        sort_folder_first: c_sort_folder_first,
        filter_types: c_filter_types
    }

}
