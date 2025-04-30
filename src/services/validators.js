export const isEmpty = (value) => {
    return !value ? `is required` : false;
}

export const minLength = (value, {min}) => {
    return value.length < min ? `must be at least ${min} characters long` : false;
}

export const maxLength = (value, {max}) => {
    return value.length > max ? `must be at most ${max} characters long` : false;
}

export const validate = (value, validators) => validators.map(
    (x) => Array.isArray(x) ? x[0](value, x[1]) : x(value)
).filter(x => x)
