import { ref } from 'vue'

export function useValidation(schema) {
  const errors = ref({})

  async function validate(data) {
    try {
      await schema.validate(data, { abortEarly: false })
      errors.value = {}
      return true
    } catch (err) {
      const validationErrors = {}
      err.inner.forEach(error => {
        validationErrors[error.path] = error.message
      })
      errors.value = validationErrors
      return false
    }
  }

  function clearErrors() {
    errors.value = {}
  }

  return {
    errors,
    validate,
    clearErrors
  }
}