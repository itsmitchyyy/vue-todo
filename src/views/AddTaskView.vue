<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import TasksForm from "@/components/Forms/TasksForm.vue";
import { useTask } from "@/composables/tasks";
import type { AddTask } from "@/domain/task";
import { useRouter } from "vue-router";

const router = useRouter();
const { useAddTask } = useTask();
const { addTask, isAddingTask } = useAddTask();

const handleAddTask = async (task: AddTask) => {
  await addTask(task);

  router.push("/tasks");
};
</script>

<template>
  <Navbar />
  <div class="container mx-auto mt-5">
    <div class="tasks--container">
      <div class="tasks-form">
        <TasksForm :is-loading="isAddingTask" @on-submit-task="handleAddTask" />
      </div>
    </div>
  </div>
</template>

<style>
.tasks {
  &--container {
    display: flex;
    justify-content: center;
    margin: auto;

    .tasks-form {
      min-width: 500px;
      border-radius: 10px;
      border: 1px solid var(--vt-c-divider-light-1);
      padding: 1em;
    }
  }
}
</style>
