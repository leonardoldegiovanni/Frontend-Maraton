import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export const useAtletaStore = defineStore('atleta', () => {
  const atletas = ref([])
  const loading = ref(false)
  const error = ref(null)

  const atletasOrdenados = computed(() => {
    return [...atletas.value].sort((a, b) => a.posicion - b.posicion)
  })

  async function fetchAtletas() {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/atleta`)
      if (!response.ok) throw new Error('Error al cargar atletas')
      atletas.value = await response.json()
    } catch (e) {
      error.value = e.message
      console.error('Error:', e)
    } finally {
      loading.value = false
    }
  }

  async function createAtleta(atleta) {
        console.log('📤 Enviando atleta:', atleta)
    console.log('🌐 URL usada:', `${API_BASE_URL}/atleta`)
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/atleta`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atleta)
      })
      if (!response.ok) throw new Error('Error al crear atleta')
      const nuevoAtleta = await response.json()
      atletas.value.push(nuevoAtleta)
      return nuevoAtleta
    } catch (e) {
      error.value = e.message
      console.error('Error:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  async function updateAtleta(id, atleta) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/atleta/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(atleta)
      })
      if (!response.ok) throw new Error('Error al actualizar atleta')
      const atletaActualizado = await response.json()
      const index = atletas.value.findIndex(a => a.id === id)
      if (index !== -1) {
        atletas.value[index] = atletaActualizado
      }
      return atletaActualizado
    } catch (e) {
      error.value = e.message
      console.error('Error:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  async function deleteAtleta(id) {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE_URL}/atleta/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Error al eliminar atleta')
      atletas.value = atletas.value.filter(a => a.id !== id)
    } catch (e) {
      error.value = e.message
      console.error('Error:', e)
      throw e
    } finally {
      loading.value = false
    }
  }

  return {
    atletas,
    atletasOrdenados,
    loading,
    error,
    fetchAtletas,
    createAtleta,
    updateAtleta,
    deleteAtleta
  }
})