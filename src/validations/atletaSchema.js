import * as yup from 'yup'

export const atletaSchema = yup.object({
  nombre: yup
    .string()
    .required('El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  dni: yup
  .string()
  .required('El DNI es obligatorio')
  .matches(/^[0-9]{8}$/, 'El DNI debe tener exactamente 8 números'),

  tiempo: yup
    .number()
    .required('El tiempo es obligatorio')
    .positive('El tiempo debe ser un número positivo')
    .typeError('El tiempo debe ser un número'),
  
  posicion: yup
    .number()
    .required('La posición es obligatoria')
    .positive('La posición debe ser un número positivo')
    .integer('La posición debe ser un número entero')
    .typeError('La posición debe ser un número'),
  
  ciudadId: yup
    .number()
    .required('La ciudad es obligatoria')
    .positive('Debe seleccionar una ciudad válida')
    .typeError('Debe seleccionar una ciudad')
})