<template>
  <div class="table-container">
    <h2>Lista de Ciudades</h2>

    <div v-if="ciudadStore.loading" class="loading">Cargando ciudades...</div>
    <div v-else-if="ciudadStore.error" class="error">{{ ciudadStore.error }}</div>
    
    <div v-else>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ciudad in ciudadStore.ciudades" :key="ciudad.id">
            <td>{{ ciudad.id }}</td>
            <td>{{ ciudad.nombre }}</td>
            <td class="actions">
              <button class="btn btn-small btn-edit" @click="$emit('edit', ciudad)">
                Editar
              </button>
              <button class="btn btn-small btn-delete" @click="handleDelete(ciudad.id)">
                Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <div v-if="ciudadStore.ciudades.length === 0" class="empty-state">
        No hay ciudades registradas
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCiudadStore } from '../stores/modules/ciudad'

defineEmits(['edit'])

const ciudadStore = useCiudadStore()

onMounted(() => {
  ciudadStore.fetchCiudades()
})

async function handleDelete(id) {
  if (confirm('¿Estás seguro de que quieres eliminar esta ciudad?')) {
    try {
      await ciudadStore.deleteCiudad(id)
    } catch (error) {
      alert('Error al eliminar la ciudad. Puede que tenga atletas asociados.')
    }
  }
}
</script>