<script setup lang="ts">
import { useProject } from "@/composables/projects";
import type { AddTask } from "@/domain/task";
import { onMounted, reactive } from "vue";
const emits = defineEmits<{
  (e: "onSubmitTask", value: AddTask): void;
}>();
defineProps<{ isLoading?: boolean }>();

const formValues = reactive<AddTask>({
  title: "",
  description: "",
  projectId: 0,
});

const { useFetchProjects, projectStore } = useProject();
const { fetchProjects } = useFetchProjects();

onMounted(fetchProjects);

const handleSubmitTask = () => {
  emits("onSubmitTask", formValues);
};
</script>

<template>
  <div class="mb-3">
    <label for="taskName" class="form-label">Task Name</label>
    <input
      type="text"
      class="form-control"
      id="taskName"
      placeholder="Task Name"
      v-model="formValues.title"
    />
  </div>
  <div class="mb-3">
    <label for="taskDescription" class="form-label">Task Description</label>
    <textarea
      v-model="formValues.description"
      class="form-control"
      id="taskDescription"
      rows="3"
    ></textarea>
  </div>
  <div class="mb-3">
    <label for="taskDescription" class="form-label">Project</label>
    <select
      v-model="formValues.projectId"
      class="form-select"
      aria-label="Default select example"
    >
      <option selected disabled value="0">Project</option>
      <option
        :value="project.id"
        v-for="project in projectStore.projects"
        :key="project.id"
      >
        {{ project.title }}
      </option>
    </select>
  </div>
  <div>
    <button
      class="btn btn-primary w-100"
      @click="handleSubmitTask"
      :disabled="isLoading"
    >
      Submit
    </button>
  </div>
</template>
