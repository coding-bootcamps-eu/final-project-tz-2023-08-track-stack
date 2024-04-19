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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register_dj.vue')
    },
    {
      path: '/overview',
      name: '/overview',
      component: () => import('../views/OverviewDj.vue')
    },
    {
      path: '/events',
      name: '/events',
      component: () => import('../views/EventsView.vue')
    },
    {
      path: '/playlists',
      name: '/playlists',
      component: () => import('../views/PlaylistsView.vue')
    },
    {
      path: '/profil',
      name: '/profil',
      component: () => import('../views/ProfilView.vue')
    },
    {
      path: '/createevent',
      name: '/createevent',
      component: () => import('../views/CreateEvent.vue')
    },
    {
      path: '/manageevents',
      name: '/manageevents',
      component: () => import('../views/ManageEvents.vue')
    },
    {
      path: '/editevent',
      name: '/editevent',
      component: () => import('../views/EditEvent.vue')
    },
    {
      path: '/createplaylist',
      name: '/createplaylist',
      component: () => import('../views/CreatePlaylist.vue')
    },
    {
      path: '/manageplaylists',
      name: '/manageplaylists',
      component: () => import('../views/ManagePlaylists.vue')
    },
    {
      path: '/editplaylist',
      name: '/editplaylist',
      component: () => import('../views/EditPlaylist.vue')
    },
    {
      path: '/visitorstart',
      name: '/visitorstart',
      component: () => import('../views/VisitorStart.vue')
    },
    {
      path: '/overviewvisitor',
      name: '/overviewvisitor',
      component: () => import('../views/OverviewVisitor.vue')
    },
    {
      path: '/wishlist',
      name: '/wishlist',
      component: () => import('../views/WishList.vue')
    },
    {
      path: '/wishsong',
      name: '/wishsong',
      component: () => import('../views/WishSong.vue')
    }
  ]
})

export default router
