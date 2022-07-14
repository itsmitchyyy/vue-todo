<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import TasksForm from "@/components/Forms/TasksForm.vue";
import { useTask } from "@/composables/tasks";
import type { AddTask } from "@/domain/task";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const props = defineProps<{ id: string }>();

const router = useRouter();
const { useUpdateTask, useFetchTasks, task } = useTask();
const { updateTask, isUpdatingTask } = useUpdateTask();
const { fetchTask, isFetchingTasks } = useFetchTasks();

onMounted(fetchTask(Number(props.id)) as any);

const handleUpdateTask = async (task: AddTask) => {
  await updateTask({ ...task, id: Number(props.id) });

  router.push("/tasks");
};
</script>

<template>
  <Navbar />
  <div class="container mx-auto mt-5">
    <div class="tasks--container">
      <div class="tasks-form">
        <TasksForm
          :task="{ ...task, projectId: task.project?.id }"
          :is-loading="isUpdatingTask || isFetchingTasks"
          @on-submit-task="handleUpdateTask"
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
