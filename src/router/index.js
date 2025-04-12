import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import HomeUser from '../views/HomeUser.vue'
import LoginView from '../views/LoginView.vue'
import ProfileUser from '../views/ProfileUser.vue'

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
        path: '/home',
        name: 'homeUser',
        component: HomeUser,
    },
    {
        path: '/profile/:id',
        name: 'profileUser',
        component: ProfileUser,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
})

export default router;