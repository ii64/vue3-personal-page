import { RouteRecordRaw, createRouter, createWebHashHistory, RouteMeta } from 'vue-router'
import animation from './animation'

declare global {
  export interface IRouteMeta extends RouteMeta {
    active: boolean
    enterActiveClass: string
    leaveActiveClass: string
    transitionName: string
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/home/index.vue'),
    children: [
      {
        path: '/',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/views/menu.vue'),
      },
      {
        path: '/home/about',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/views/about.vue'),
      },
      {
        path: '/home/resume',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/views/resume.vue'),
      },
      {
        path: '/home/portofolio',
        component: () => {
          return import(/* webpackChunkName: "home" */ '../views/home/views/portofolio.vue')
        },
      },
      {
        path: '/home/contact',
        component: () => import(/* webpackChunkName: "home" */ '../views/home/views/contact.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/about/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.afterEach((to, from) => {
  const toDepth = to.path.split('/').length
  const fromDepth = from.path.split('/').length

  const toMeta = <IRouteMeta>to.meta
  const fromMeta = <IRouteMeta>from.meta

  fromMeta.active = false
  toMeta.active = true

  toMeta.transitionName = 'custom-classes-transition'

  const idx = toDepth < fromDepth ? 17 : 18
  const { in: inClass, out: outClass } = animation(idx)
  toMeta.enterActiveClass = inClass
  toMeta.leaveActiveClass = outClass
})

export default router
