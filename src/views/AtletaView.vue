<template>
  <div class="view-container">
    <div class="view-header">
      <h1>Gestión de Atletas</h1>
      <button class="btn btn-primary" @click="toggleForm">
        {{ showForm ? 'Cancelar' : 'Nuevo Atleta' }}
      </button>
    </div>

    <div v-if="showForm" class="section">
      <AtletaFormComponent
        :atleta="selectedAtleta"
        @success="handleSuccess"
        @cancel="handleCancel"
      />
    </div>

    <div class="section">
      <AtletaTable @edit="handleEdit" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import AtletaFormComponent from '../components/AtletaFormComponent.vue'
import AtletaTable from '../components/AtletaTable.vue'

const showForm = ref(false)
const selectedAtleta = ref(null)

function toggleForm() {
  showForm.value = !showForm.value
  if (!showForm.value) {
    selectedAtleta.value = null
  }
}

function handleEdit(atleta) {
  selectedAtleta.value = atleta
  showForm.value = true
}

function handleSuccess() {
  showForm.value = false
  selectedAtleta.value = null
}

function handleCancel() {
  showForm.value = false
  selectedAtleta.value = null
}
</script>

<style scoped>
.view-container {
  width: 100%;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.view-header h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin: 0;
}

.section {
  background: white;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
</style>