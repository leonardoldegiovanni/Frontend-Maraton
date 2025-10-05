<template>
  <div class="table-container">
    <h2>Lista de Atletas</h2>

    <div v-if="atletaStore.loading" class="loading">Cargando atletas...</div>
    <div v-else-if="atletaStore.error" class="error">{{ atletaStore.error }}</div>
    
    <div v-else>
      <table class="data-table">
        <thead>
          <tr>
            <th>Posición</th>
            <th>Nombre</th>
            <th>DNI</th>
            <th>Tiempo</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="atleta in atletaStore.atletasOrdenados"
            :key="atleta.id"
            :class="getPodiumClass(atleta.posicion)"
          >
            <td>{{ atleta.posicion }}</td>
            <td>{{ atleta.nombre }}</td>
            <td>{{ atleta.dni }}</td>
            <td>{{ atleta.tiempo }} min</td>
            <td>{{ getCiudadNombre(atleta.ciudadId) }}</td>
            <td class="actions">
              <button class="btn btn-small btn-edit" @click="$emit('edit', atleta)">
                Editar
              </button>
              <button class="btn btn-small btn-delete" @click="handleDelete(atleta.id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="atletaStore.atletas.length === 0" class="empty-state">
        No hay atletas registrados
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAtletaStore } from '../stores/modules/atleta'
import { useCiudadStore } from '../stores/modules/ciudad'

defineEmits(['edit'])

const atletaStore = useAtletaStore()
const ciudadStore = useCiudadStore()

onMounted(() => {
  atletaStore.fetchAtletas()
  if (ciudadStore.ciudades.length === 0) {
    ciudadStore.fetchCiudades()
  }
})

function getCiudadNombre(ciudadId) {
  const ciudad = ciudadStore.ciudades.find(c => c.id === ciudadId)
  return ciudad ? ciudad.nombre : 'Desconocida'
}

function getPodiumClass(posicion) {
  if (posicion === 1) return 'podium-gold'
  if (posicion === 2) return 'podium-silver'
  if (posicion === 3) return 'podium-bronze'
  return ''
}

async function handleDelete(id) {
  if (confirm('¿Estás seguro de que quieres eliminar este atleta?')) {
    await atletaStore.deleteAtleta(id)
  }
}
</script>