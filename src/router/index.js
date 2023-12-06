import ManetteView from "@/components/ManetteView";
import AdminView from "@/components/AdminView";
import RaceView from "@/components/RaceView";
import {createRouter, createWebHashHistory} from 'vue-router'
import InfoView from "@/components/InfoView.vue";
import LGMXView from "@/components/LGMXView.vue";

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
        path: '/lgmx',
        component: LGMXView,
    },
    {
        path: '/info',
        component: InfoView,
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
