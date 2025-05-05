export const isEmpty = (value) => !value ? `is required` : false
export const minLength = (value, {min}) => value.length < min ? `must be at least ${min} characters long` : false
export const maxLength = (value, {max}) => value.length > max ? `must be at most ${max} characters long` : false

export const validate = (value, validators) => validators.map(
    (x) => Array.isArray(x) ? x[0](value, x[1]) : x(value)
).filter(x => x)
