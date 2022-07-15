<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import IconPlus from "@/components/atoms/Icons/IconPlus.vue";
import TaskLists from "@/components/TaskLists.vue";
import { useRouter } from "vue-router";
import { useTask } from "@/composables/tasks";
import { onMounted } from "vue";

const router = useRouter();
const { useFetchTasks, useDeleteTask, tasks } = useTask();
const { fetchTasks, isFetchingTasks } = useFetchTasks();
const { deleteTask, isDeletingTask } = useDeleteTask();

onMounted(fetchTasks);

const handleDeleteTask = async (id: number) => {
  await deleteTask(id);
};
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
        <TaskLists
          :is-loading="isFetchingTasks"
          :is-deleting="isDeletingTask"
          @on-delete-task="handleDeleteTask"
          :tasks="tasks"
        />
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
