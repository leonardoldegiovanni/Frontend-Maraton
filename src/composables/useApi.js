import { ref } from 'vue'

// Composable para manejar llamadas a la API
export function useApi() {
  const loading = ref(false)
  const error = ref(null)

  async function execute(apiCall) {
    loading.value = true
    error.value = null
    try {
      const result = await apiCall()
      return result
    } catch (err) {
      error.value = err.message
      console.error('Error en API:', err)
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    execute
  }
}