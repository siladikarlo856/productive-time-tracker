import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView/HomeView.vue";
import TimeView from "@/views/TimeView/TimeView.vue";
import NotFound from "@/views/NotFound/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/time",
    name: "time",
    component: TimeView,
  },
  {
    path: `/:pathMatch(.*)*`,
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
