import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        components: {
            default: () => import('../views/HomeView.vue'),
            Header: () => import('../components/headers/DefaultHeader.vue'),
            LeftSideBar: () => import('../components/sidebars/MainSidebar.vue'),
        },
    },

    {
        path: '/:id(\\d+)',
        components: {
            default: () => import('../views/contents/ContentsIndex.vue'),
            Header: () => import('../components/headers/DefaultHeader.vue'),
            LeftSideBar: () => import('../components/sidebars/MainSidebar.vue'),
        },
        props: {
            default: (route) => ({ 
                content_id: parseInt(route.params.id) 
            }),
        },
        children: [
            {   name: 'show-content',
                path: '',
                component: () => import('../views/contents/ContentShow.vue')
            },
            {
                name: 'browse-content',
                path: 'browse',
                components: {
                    default: () => import('../views/contents/ContentsBrowse.vue'),
                }
            },
            {
                name: 'edit-content',
                path: 'edit',
                components: {
                    default: () => import('../views/contents/ContentEdit.vue'),
                }
            },
            {
                name: 'add-content',
                path: 'add',
                components: {
                    default: () => import('../views/contents/ContentAdd.vue'),
                },
                props: {
                    default: (route) => ({
                        type: route.query.type,
                    })
                }
            },

        ]
    },


    {
        path: '/accounts',
        components: {
            default: () => import('../views/accounts/AccountsIndex.vue'),
            Header: () => import('../components/headers/DefaultHeader.vue'),
            LeftSideBar: () => import('../components/sidebars/MainSidebar.vue'),
        },
        children: [
            {
                name: 'browse-accounts',
                path: '',
                component: () => import('../views/accounts/AccountsBrowse.vue')
            },
        ]
    },

    {
        path: '/roles',
        name: 'roles',
        components:{
            default: () => import('../views/roles/RolesIndex.vue'),
            Header: () => import('../components/headers/DefaultHeader.vue'),
            LeftSideBar: () => import('../components/sidebars/MainSidebar.vue'),
        },
        children: [
            {
                name: 'browse-roles',
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
            },
            {
                name: 'edit_permissions',
                path: 'permissions',
                component: () => import('../views/roles/RolePermissions.vue'),
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
