<script setup lang="ts">
import Navbar from "@/components/molecules/Navbar/Navbar.vue";
import TasksForm from "@/components/organisms/TasksForm/TasksForm.vue";
import { useAddTask } from "@/composables";
import type { AddTask } from "@/domain/task";
import { ref } from "vue";
import { useMutation } from "vue-query";
import { useRouter } from "vue-router";

const errors = ref<any>();
const router = useRouter();
const { addTask } = useAddTask();

const { mutate: addTaskMutation, isLoading: isAddingTask } = useMutation(
  (payload: AddTask) => {
    return addTask(payload);
  },
  {
    onSuccess: () => router.push("/tasks"),
    onError: (error: any) => {
      if (error?.response?.status === 422) {
        errors.value = error.response.data.errors;
      }
    },
  },
);

const handleTouchedInput = (touched: {
  title: boolean;
  description: boolean;
  project_id: boolean;
}) => {
  errors.value = {
    title: touched.title ? "" : errors.value?.title,
    description: touched.description ? "" : errors.value?.description,
    project_id: touched.project_id ? "" : errors.value?.project_id,
  };
};

const handleAddTask = async (task: AddTask) => {
  addTaskMutation(task);
};
</script>

<template>
  <Navbar />
  <div class="container mx-auto mt-5">
    <div class="tasks--container">
      <div class="tasks-form">
        <TasksForm
          :errors="errors"
          :is-loading="isAddingTask"
          @on-submit-task="handleAddTask"
          @on-touched-input="handleTouchedInput"
        />
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
