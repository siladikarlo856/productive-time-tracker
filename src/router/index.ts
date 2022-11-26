import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView/HomeView.vue";
import AboutView from "@/views/AboutView/AboutView.vue";
import TimeView from "@/views/TimeView/TimeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: "/time",
    name: "time",
    component: TimeView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
