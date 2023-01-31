import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/roles',
        name: 'roles',
        component: () => import('../views/roles/RolesIndex.vue'),
        children: [
            {
                name: 'browse_role',
                path: '',
                component: () => import('../views/roles/RolesBrowse.vue')
            },
            {
                name: 'add_role',
                path: 'new',
                component: () => import('../views/roles/RoleAdd.vue')
            }
        ]
    },
    {
        path: '/roles/:id(\\d+)',
        name: 'role',
        component: () => import('../views/roles/RoleIndex.vue'),
        props: (route) => ({ 
            role_id: parseInt(route.params.id) 
        }),
        children: [
            {
                name: 'edit_role',
                path: 'edit',
                component: () => import('../views/roles/RoleEdit.vue'),
            },
            {
                name: 'edit_members',
                path: 'members',
                component: () => import('../views/roles/RoleMembers.vue'),
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
