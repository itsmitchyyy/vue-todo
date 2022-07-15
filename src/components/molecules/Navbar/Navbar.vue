<script lang="ts">
export default {
  name: "NavBar",
};
</script>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";
import { useAuth } from "@/composables/auth";

const route = useRoute();
const router = useRouter();
const path = computed(() => route?.path);
const { useLogout, user } = useAuth();
const { logout } = useLogout();

const handleLogout = async () => {
  await logout();
  router.push("/login");
};
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">TODO</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mx-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: path?.includes('tasks') }"
              aria-current="page"
              href="/tasks"
              >Tasks</a
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link"
              :class="{ active: path?.includes('projects') }"
              href="/projects"
              >Projects</a
            >
          </li>
        </ul>
        <div class="d-flex">
          <div class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {{ user?.user.name }}
            </a>
            <ul
              class="dropdown-menu dropdown-menu-md-start dropdown-menu-lg-end"
              aria-labelledby="navbarDropdown"
            >
              <li><a class="dropdown-item" href="#">Action</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <button class="dropdown-item" h @click="handleLogout">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.dropdownWidth {
  width: 8rem;
}
</style>
