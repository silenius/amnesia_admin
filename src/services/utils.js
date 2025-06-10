import { toValue }  from 'vue'

export const debounce = (callback, wait) => {
    let timeoutId = null;
    return (...args) => {
        window.clearTimeout(timeoutId);
        timeoutId = window.setTimeout(() => {
            callback.apply(null, args);
        }, wait);
    };
}

export const range = (start, stop, step) => Array.from(
    { length: Math.ceil((stop - start) / step) },
    (_, i) => start + i * step
)

export const as_id = (obj_or_id) => {
    const value = toValue(obj_or_id)
    let id = parseInt(value)

    if (isNaN(id)) {
        id = parseInt(value.id)
        
        if (isNaN(id)) {
           id = undefined 
        }
    }

    return id
}
