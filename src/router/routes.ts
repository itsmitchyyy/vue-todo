const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/components/pages/Login/LoginPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/components/pages/Login/LoginPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/components/pages/Register/RegisterPage.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/components/pages/AboutView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("@/components/pages/Project/ProjectPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/projects/add-projects",
    name: "add-projects",
    component: () => import("@/components/pages/Project/AddProjectPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/projects/:id/edit",
    name: "edit-projects",
    component: () => import("@/components/pages/Project/EditProjectPage.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: () => import("@/components/pages/Task/TaskPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tasks/add-tasks",
    name: "add-tasks",
    component: () => import("@/components/pages/Task/AddTaskPage.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tasks/:id/edit",
    name: "edit-tasks",
    component: () => import("@/components/pages/Task/EditTaskPage.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/:patchMatch(.*)*",
    component: () => import("@/components/pages/NotFound.vue"),
  },
];

export default routes;
