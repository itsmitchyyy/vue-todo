<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import IconPlus from "@/components/icons/IconPlus.vue";
import TaskLists from "@/components/TaskLists.vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <Navbar />
  <div class="container mx-auto mt-5">
    <div>
      <button
        @click="router.push('/tasks/add-tasks')"
        class="btn btn-custom-style btn-outline-primary"
      >
        <span class="btn-label"><IconPlus /></span>Add Task
      </button>

      <div class="d-flex mt-5">
        <TaskLists />
      </div>
    </div>
  </div>
</template>

<style>
.btn-custom-style {
  .btn-label {
    display: inline-flex;
    margin-right: 0.5em;

    svg {
      height: 12px;
      width: 15px;

      path {
        fill: var(--bs-btn-color);
      }
    }
  }

  &:hover {
    .btn-label {
      svg {
        path {
          fill: var(--vt-c-white);
        }
      }
    }
  }
}
</style>
