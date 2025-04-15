import { useFetchBackend } from '../composables/fetch.js'

export async function change_weight(content_id, new_weight) {
    const { error, fetchData } = useFetchBackend()
    const data = new FormData()
    data.append('weight', weight)

    await fetchData(`${id}/weight`, {
        method: 'POST',
        body: data
    })
}
