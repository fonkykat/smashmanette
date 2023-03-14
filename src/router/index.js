import ManetteView from "@/components/ManetteView";
import AdminView from "@/components/AdminView";
import RaceView from "@/components/RaceView";
import {createRouter, createWebHashHistory} from 'vue-router'

const routes = [
    {
        path: '',
      component: ManetteView,
    },
      {
        path: '/admin',
        component: AdminView,
      },
      {
        path: '/race',
        component: RaceView,
      },
  ]

const router =  createRouter({
  // mode: process.env.VUE_APP_ROUTER_MODE_HISTORY === 'true' ? 'history' : 'hash',
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
