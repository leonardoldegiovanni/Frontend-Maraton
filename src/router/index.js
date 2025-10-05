import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layouts/MainLayout.vue'
import CiudadView from '../views/CiudadView.vue'
import AtletaView from '../views/AtletaView.vue'

const routes = [
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '',
        redirect: '/ciudades'
      },
      {
        path: '/ciudades',
        name: 'ciudades',
        component: CiudadView
      },
      {
        path: '/atletas',
        name: 'atletas',
        component: AtletaView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
