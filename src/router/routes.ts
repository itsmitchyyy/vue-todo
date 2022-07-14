import HomeViewVue from "@/views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeViewVue,
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "login",
    component: HomeViewVue,
    meta: { requiresAuth: false },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/projects",
    name: "projects",
    component: () => import("@/views/ProjectView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/projects/add-projects",
    name: "add-projects",
    component: () => import("@/views/AddProjectView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/projects/:id/edit",
    name: "edit-projects",
    component: () => import("@/views/EditProjectView.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/tasks",
    name: "tasks",
    component: () => import("@/views/TaskView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tasks/add-tasks",
    name: "add-tasks",
    component: () => import("@/views/AddTaskView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/tasks/:id/edit",
    name: "edit-tasks",
    component: () => import("@/views/EditTaskView.vue"),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: "/:patchMatch(.*)*",
    component: () => import("@/views/NotFoundView.vue"),
  },
];

export default routes;
