import { toValue } from 'vue'

export function asURLSearchParams(obj) {
    const obj_value = toValue(obj)
    const urlp = new URLSearchParams()

    Object.entries(obj_value).forEach(
        ([key, value]) => Array.isArray(value) 
            // p: ['foo', 'bar'] => p=foo&p=bar
            ? value.forEach(v => urlp.append(key, v)) 
            // p: somevalue => p=somevalue
            : urlp.append(key, value)
    )

    return urlp
}
