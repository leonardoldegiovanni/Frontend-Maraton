import * as yup from 'yup'

export const ciudadSchema = yup.object({
  nombre_ciudad: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(50, 'El nombre no puede exceder 50 caracteres')
})