import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/roles',
        name: 'admin_roles',
        component: () => import('../views/RolesView.vue')
    },
    {
        path: '/role/:id(\\d+)',
        name: 'admin_role',
        component: () => import('../views/RoleView.vue'),
        children: [
            {
                path: 'members',
                //component:
            }

        ]

    }
]
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: routes,
    sensitive: true
})

export default router
