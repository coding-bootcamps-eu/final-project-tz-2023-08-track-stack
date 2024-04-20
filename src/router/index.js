import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/dj/DjLogin.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/dj/DjRegister.vue')
    },
    {
      path: '/djoverview',
      name: '/djoverview',
      component: () => import('../views/dj/DjOverview.vue')
    },
    {
      path: '/events',
      name: '/events',
      component: () => import('../views/dj/EventsView.vue')
    },
    {
      path: '/playlists',
      name: '/playlists',
      component: () => import('../views/dj/PlaylistsView.vue')
    },
    {
      path: '/profil',
      name: '/profil',
      component: () => import('../views/dj/ChangeProfil.vue')
    },
    {
      path: '/createevent',
      name: '/createevent',
      component: () => import('../views/dj/CreateEvent.vue')
    },
    {
      path: '/editevent',
      name: '/editevent',
      component: () => import('../views/dj/EditEvent.vue')
    },
    {
      path: '/createplaylist',
      name: '/createplaylist',
      component: () => import('../views/dj/CreatePlaylist.vue')
    },
    {
      path: '/editplaylist',
      name: '/editplaylist',
      component: () => import('../views/dj/EditPlaylist.vue')
    },
    {
      path: '/gueststart',
      name: '/gueststart',
      component: () => import('../views/guest/GuestStart.vue')
    },
    {
      path: '/guestoverview',
      name: '/guestoverview',
      component: () => import('../views/guest/GuestOverview.vue')
    },
    {
      path: '/wishlist',
      name: '/wishlist',
      component: () => import('../views/WishList.vue')
    },
    {
      path: '/wishsong',
      name: '/wishsong',
      component: () => import('../views/visitor/WishSong.vue')
    }
  ]
})

export default router
