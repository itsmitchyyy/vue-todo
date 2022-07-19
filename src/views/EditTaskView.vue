<script setup lang="ts">
import Navbar from "@/components/molecules/Navbar/Navbar.vue";
import TasksForm from "@/components/organisms/TasksForm/TasksForm.vue";
import type { AddTask } from "@/domain/task";
import { useRouter } from "vue-router";
import { useFetchTasks, useUpdateTask } from "@/composables";
import { useMutation, useQuery } from "vue-query";
import { ref } from "vue";

const props = defineProps<{ id: string }>();

const errors = ref<any>();
const router = useRouter();
const { fetchTask } = useFetchTasks();
const { updateTask } = useUpdateTask();

const { data: task, isFetching: isFetchingTasks } = useQuery(
  ["task", props.id],
  () => {
    return fetchTask(Number(props.id));
  },
);

const { mutate: updateTaskMutation, isLoading: isUpdatingTask } = useMutation(
  (task: AddTask & { id: number }) => {
    return updateTask(task);
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

const handleUpdateTask = async (task: AddTask) => {
  updateTaskMutation({ ...task, id: Number(props.id) });
};
</script>

<template>
  <Navbar />
  <div class="container mx-auto mt-5">
    <div class="tasks--container">
      <div class="tasks-form">
        <TasksForm
          :errors="errors"
          :task="
            task
              ? { ...task, projectId: task.project?.id }
              : { title: '', description: '', projectId: 0 }
          "
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
