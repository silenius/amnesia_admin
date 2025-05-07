import { toValue } from 'vue'

export const role_as_formdata = (role) => {
    const data = new FormData()
    const role_value = toValue(role)

    data.append('name', role_value.name)
    data.append('description', role_value.description)

    return data
}
