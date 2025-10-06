<template>
  <div class="form-container">
    <h2>{{ atleta ? 'Editar Atleta' : 'Nuevo Atleta' }}</h2>

    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="nombre">Nombre:</label>
        <input
          id="nombre"
          v-model="formData.nombre"
          type="text"
          :class="{ 'input-error': errors.nombre }"
        />
        <span v-if="errors.nombre" class="error-message">{{ errors.nombre }}</span>
      </div>

      <div class="form-group">
        <label for="dni">DNI:</label>
        <input
          id="dni"
          v-model.trim="formData.dni"
          type="text"
          placeholder="12345678"
          :class="{ 'input-error': errors.dni }"
        />
        <span v-if="errors.dni" class="error-message">{{ errors.dni }}</span>
      </div>

  
      <div class="form-group">
        <label for="tiempo">Tiempo (minutos):</label>
        <input
          id="tiempo"
          v-model.number="formData.tiempo"
          type="number"
          step="0.01"
          :class="{ 'input-error': errors.tiempo }"
        />
        <span v-if="errors.tiempo" class="error-message">{{ errors.tiempo }}</span>
      </div>

 
      <div class="form-group">
        <label for="posicion">Posición:</label>
        <input
          id="posicion"
          v-model.number="formData.posicion"
          type="number"
          :class="{ 'input-error': errors.posicion }"
        />
        <span v-if="errors.posicion" class="error-message">{{ errors.posicion }}</span>
      </div>

  
      <div class="form-group">
        <label for="ciudadId">Ciudad:</label>
        <select
          id="ciudadId"
          v-model.number="formData.ciudadId"
          :class="{ 'input-error': errors.ciudadId }"
        >
          <option value="">Selecciona una ciudad</option>
          <option
            v-for="ciudad in ciudadStore.ciudades"
            :key="ciudad.id"
            :value="ciudad.id"
          >
            {{ ciudad.nombre_ciudad }}
          </option>
        </select>
        <span v-if="errors.ciudadId" class="error-message">{{ errors.ciudadId }}</span>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Guardando...' : 'Guardar' }}
        </button>
        <button type="button" class="btn btn-secondary" @click="$emit('cancel')">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAtletaStore } from '../stores/modules/atleta'
import { useCiudadStore } from '../stores/modules/ciudad'
import { useValidation } from '../composables/useValidation'
import { atletaSchema } from '../validations/atletaSchema'

const props = defineProps({
  atleta: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['success', 'cancel'])

const atletaStore = useAtletaStore()
const ciudadStore = useCiudadStore()
const { errors, validate } = useValidation(atletaSchema)

const formData = ref({
  nombre: '',
  dni: '',
  tiempo: '',
  posicion: '',
  ciudadId: ''
})
const loading = ref(false)

onMounted(() => {
  if (ciudadStore.ciudades.length === 0) {
    ciudadStore.fetchCiudades()
  }

  if (props.atleta) {
    formData.value = {
      id: props.atleta.id,
      nombre: props.atleta.nombre,
      dni: props.atleta.dni,
      tiempo: props.atleta.tiempo,
      posicion: props.atleta.posicion,
      ciudadId: props.atleta.ciudad?.id || ''
    }
  }
})

function verificarDniDuplicado(dni) {
  const dniLimpio = String(dni).trim()
  return atletaStore.atletas.some(a => {
    if (props.atleta && a.id === props.atleta.id) return false
    return String(a.dni).trim() === dniLimpio
  })
}

async function handleSubmit() {
  const isValid = await validate(formData.value)
  if (!isValid) return

  if (verificarDniDuplicado(formData.value.dni)) {
    alert(`❌ Ya existe un atleta con el DNI ${formData.value.dni}`)
    return
  }

  loading.value = true
  try {
    if (props.atleta) {
      await atletaStore.updateAtleta(props.atleta.id, formData.value)
    } else {
      await atletaStore.createAtleta(formData.value)
    }

    emit('success')
    
    formData.value = {
      nombre: '',
      dni: '',
      tiempo: '',
      posicion: '',
      ciudadId: ''
    }
  } catch (error) {
    console.error('Error al guardar atleta:', error)
    alert('Ocurrió un error al guardar el atleta. Verifica la consola para más detalles.')
  } finally {
    loading.value = false
  }
}
</script>
