import { defineStore } from 'pinia'
import { ref } from 'vue'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useCiudadStore = defineStore('ciudad', () => {
  const ciudades = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Obtener todas las ciudades
  async function fetchCiudades() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/ciudad`)
      if (!response.ok) throw new Error('Error al cargar ciudades')
      ciudades.value = await response.json()
    } catch (e) {
      error.value = e.message
      console.error('Error:', e)
    } finally {
      loading.value = false
    }
  }

  // Crear una nueva ciudad
 async function createCiudad(ciudad) {
  console.log('🌐 URL usada:', `${API_BASE_URL}/ciudad`)
  loading.value = true
  error.value = null
  try {
    console.log('📤 Enviando ciudad:', ciudad)

    const response = await fetch(`${API_BASE_URL}/ciudad`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(ciudad)
    })

    const text = await response.text()
    console.log('📩 Respuesta cruda del backend:', response.status, text)

    if (!response.ok) {
      throw new Error(`Error al crear ciudad (${response.status})`)
    }

    const nuevaCiudad = JSON.parse(text)
    ciudades.value.push(nuevaCiudad)
    return nuevaCiudad
  } catch (e) {
    error.value = e.message
    console.error('❌ Error en createCiudad:', e)
    throw e
  } finally {
    loading.value = false
  }
}

  async function updateCiudad(id, ciudad) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/ciudad/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ciudad)
      })
      if (!response.ok) throw new Error('Error al actualizar ciudad')
      const ciudadActualizada = await response.json()
      const index = ciudades.value.findIndex(c => c.id === id)
      if (index !== -1) {
        ciudades.value[index] = ciudadActualizada
      }
      return ciudadActualizada
    } catch (e) {
      error.value = e.message
      console.error('Error:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  async function deleteCiudad(id) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/ciudad/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Error al eliminar ciudad')
      ciudades.value = ciudades.value.filter(c => c.id !== id)
    } catch (e) {
      error.value = e.message
      console.error('Error:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    ciudades,
    loading,
    error,
    fetchCiudades,
    createCiudad,
    updateCiudad,
    deleteCiudad
  }
})