<template>
  <div class="form-container">
    <h2>{{ ciudad ? 'Editar Ciudad' : 'Nueva Ciudad' }}</h2>
    
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="nombre">Nombre de la Ciudad:</label>
        <input
          id="nombre_ciudad"
          v-model="formData.nombre_ciudad"
          type="text"
          :class="{ 'input-error': errors.nombre }"
        />
        <span v-if="errors.nombre" class="error-message">{{ errors.nombre }}</span>
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
import { useCiudadStore } from '../stores/modules/ciudad'
import { useValidation } from '../composables/useValidation'
import { ciudadSchema } from '../validations/ciudadSchema'

const props = defineProps({
  ciudad: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['success', 'cancel'])

const ciudadStore = useCiudadStore()
const { errors, validate } = useValidation(ciudadSchema)

const formData = ref({ nombre_ciudad: '' })
const loading = ref(false)

onMounted(() => {
  if (props.ciudad) {
    formData.value = { ...props.ciudad }
  }
})

async function handleSubmit() {
  const isValid = await validate(formData.value)
  if (!isValid) return

  loading.value = true
  try {
    if (props.ciudad) {
      await ciudadStore.updateCiudad(props.ciudad.id, formData.value)
    } else {
      await ciudadStore.createCiudad(formData.value)
    }
    emit('success')
    formData.value = { nombre: '' }
  } catch (error) {
    console.error('Error al guardar ciudad:', error)
  } finally {
    loading.value = false
  }
}
</script>