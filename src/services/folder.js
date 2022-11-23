import { useFetch } from '@/services/fetch'

export function lineage(folder_id) {
    const { data, error } = useFetch('http://10.209.1.41:10613/bbpf/folder/' + folder_id + '/lineagee');

    if (error) {
        console.log('ERROR')
        console.log(error)
    } else {
        console.log('DATA')
        console.log(data)
    }
}
