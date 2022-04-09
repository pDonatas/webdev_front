import { createRouter, createWebHistory } from 'vue-router'
import store from "@/store";

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Auth/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Auth/LoginView.vue')
  },
  {
    path: '/logout',
    name: 'logout',
    component: {
      beforeRouteEnter() {
        store.dispatch("logout");
        localStorage.clear();
        window.location.href = '/';
      }
    }
  },
  {
    path: '/users/create',
    name: 'CreateUser',
    component: () => import('@/views/Users/CreateView.vue'),
    beforeRouteEnter() {
      if (!store.getters.user) {
        window.location.href = '/login';
      }
    }
  },
  {
    path: '/users/:id/edit',
    name: 'EditUser',
    component: () => import('@/views/Users/EditView.vue'),
    beforeRouteEnter() {
      if (!store.getters.user) {
        window.location.href = '/login';
      }
    }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/Users/UsersView.vue'),
    beforeRouteEnter() {
      if (!store.getters.user) {
        window.location.href = '/login';
      }
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
