import {createRouter, createWebHistory} from 'vue-router'
import {getAdmin, getAdminToken} from "@/utils/auth";
import {ElMessage} from "element-plus";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/login/index.vue')
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/home/index.vue'),
            children: [
                {
                    path: '',
                    name: 'Index',
                    component: () => import('@/views/index/index.vue')
                },
                {
                  path:'user_manage',
                    name:'UserManage',
                    component:()=>import('@/views/user_manage/index.vue')
                },
                {
                    path: 'help-manage',
                    name: 'HelpManage',
                    component: () => import('@/views/help-manage/index.vue')
                },
                {
                    path: 'donate-manage',
                    name: 'DonateManage',
                    component: () => import('@/views/donate-manage/index.vue')
                },
                {
                    path: 'activity-manage',
                    name: 'ActivityManage',
                    component: () => import('@/views/activity-manage/index.vue')
                },
                {
                    path: 'message-manage',
                    name: 'MessageManage',
                    component: () => import('@/views/message-manage/index.vue')
                }
            ]
        },
        {
            path: '/',
            redirect: '/home'
        }
    ]
})
router.beforeEach((to, from, next) => {
            if (to.path === '/login') {
                next()
            }
            if (getAdminToken() === undefined || getAdminToken() === null || getAdminToken() === '' || getAdmin() === null || getAdmin() === undefined || getAdmin() === '') {
                ElMessage.error('请先登录')
                console.log('请先登录')
                next('/login')
            } else {
                next()
            }
    }
)
export default router
