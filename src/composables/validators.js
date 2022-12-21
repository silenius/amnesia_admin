export function useValidators() {

    const isEmpty = (name, value) => {
        return !value ? `The ${name} field is required` : false;
    }
    
    const minLength = (name, value, min) => {
        return value.length < min ? `The ${name} field must be at least ${min} characters long` : false;
    }

    const maxLength = (name, value, max) => {
        return value.length > max ? `The ${name} field must be at most ${max} characters long` : false;
    }
  
    return {
        isEmpty, 
        minLength,
        maxLength
    }
}
