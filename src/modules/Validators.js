export default function useValidators() {

    const isEmpty = (name, value) => {
        return !value ? `The ${name} field is required` : "";
    }
    
    const minLength = (name, value, min) => {
        return value.length < min ? `The ${name} field must be at least ${min} characters long` : "";
    }
  
    return {
        isEmpty, 
        minLength
    }
}
