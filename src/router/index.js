import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeUser from '../views/HomeUser.vue'
import LoginView from '../views/LoginView.vue'
import ProfileUser from '../views/ProfileUser.vue'
import DiscussionView from '../views/SingleDiscussion.vue'
import CreateThread from '../views/CreateDiscussion.vue'
import DashboardView from '../views/DicussionsList.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: DashboardView,
        meta: { requiresAuth: true } 
      },
    {
        path: '/home',
        name: 'homeUser',
        component: HomeUser,
    },
    {
        path: '/profile/:id',
        name: 'profileUser',
        component: ProfileUser,
        props: true
    },
    {
        path: '/discussion/:id',
        name: 'Discussion',
        component: DiscussionView,
        meta: { requiresAuth: true } // Authentication required for discussions
      },
      
      {
        path: '/create',
        name: 'CreateThread',
        component: CreateThread,
        meta: { requiresAuth: true } // Authentication required for creating threads
      }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router;