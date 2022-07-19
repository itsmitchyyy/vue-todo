import { useAuthStore } from "@/stores/auth/auth";
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.user?.token) {
    next({ name: "login" });
  } else if (!to.meta.requiresAuth && authStore.user?.token) {
    next({ name: "tasks" });
  } else {
    next();
  }
});

export default router;
