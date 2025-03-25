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
