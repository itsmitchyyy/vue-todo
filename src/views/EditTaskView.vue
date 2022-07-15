<script setup lang="ts">
import Navbar from "@/components/molecules/Navbar/Navbar.vue";
import TasksForm from "@/components/organisms/TasksForm/TasksForm.vue";
import { useTask } from "@/composables/tasks";
import type { AddTask } from "@/domain/task";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const props = defineProps<{ id: string }>();

const router = useRouter();
const { useUpdateTask, useFetchTasks, task, errors, isSuccess } = useTask();
const { updateTask, isUpdatingTask } = useUpdateTask();
const { fetchTask, isFetchingTasks } = useFetchTasks();

onMounted(fetchTask(Number(props.id)) as any);

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

const handleUpdateTask = async (task: AddTask) => {
  await updateTask({ ...task, id: Number(props.id) });

  if (isSuccess.value) {
    router.push("/tasks");
  }
};
</script>

<template>
  <Navbar />
  <div class="container mx-auto mt-5">
    <div class="tasks--container">
      <div class="tasks-form">
        <TasksForm
          :errors="errors"
          :task="{ ...task, projectId: task.project?.id }"
          :is-loading="isUpdatingTask || isFetchingTasks"
          @on-submit-task="handleUpdateTask"
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
