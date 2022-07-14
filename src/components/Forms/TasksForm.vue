<script setup lang="ts">
import { useProject } from "@/composables/projects";
import type { AddTask } from "@/domain/task";
import { onMounted, reactive, watch } from "vue";

const props = defineProps<{
  isLoading?: boolean;
  task?: AddTask;
}>();
const emits = defineEmits<{
  (e: "onSubmitTask", value: AddTask): void;
}>();

const formValues = reactive<AddTask>({
  title: "",
  description: "",
  projectId: 0,
});

const unwatch = watch(
  () => props.task,
  () => {
    Object.assign(formValues, props.task);
  },
);

const { useFetchProjects, projectStore } = useProject();
const { fetchProjects, isFetchingProjects } = useFetchProjects();

onMounted(fetchProjects);

const handleSubmitTask = () => {
  unwatch();
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
      :disabled="isLoading"
    />
  </div>
  <div class="mb-3">
    <label for="taskDescription" class="form-label">Task Description</label>
    <textarea
      v-model="formValues.description"
      class="form-control"
      id="taskDescription"
      rows="3"
      :disabled="isLoading"
    ></textarea>
  </div>
  <div class="mb-3">
    <label for="taskDescription" class="form-label">Project</label>
    <select
      v-model="formValues.projectId"
      class="form-select"
      aria-label="Default select example"
      :disabled="isFetchingProjects || isLoading"
    >
      <option selected disabled :value="0">
        {{ isFetchingProjects ? "Loading..." : "Project" }}
      </option>
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
      :disabled="isFetchingProjects || isLoading"
    >
      Submit
    </button>
  </div>
</template>
