<script setup lang="ts">
import { useProject } from "@/composables/projects";
import { onMounted, reactive, watch } from "vue";
import type { AddTask } from "@/domain/task";

import type { FormProps, TouchedInputProps } from "./types";

const props = defineProps<{
  isLoading?: FormProps["isLoading"];
  task?: AddTask;
  errors?: FormProps["errors"];
}>();
const emits = defineEmits<{
  (e: "onSubmitTask", value: AddTask): void;
  (e: "onTouchedInput", touched: TouchedInputProps): void;
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

watch(
  () => [formValues.title, formValues.description, formValues.projectId],
  () => {
    emits("onTouchedInput", {
      title: !!formValues.title,
      description: !!formValues.description,
      project_id: !!formValues.projectId,
    });
  },
);

const { useFetchProjects, projects } = useProject();
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
      :class="{ 'is-invalid': !!errors?.title }"
      id="taskName"
      placeholder="Task Name"
      v-model="formValues.title"
      :disabled="isLoading"
    />
    <div class="invalid-feedback" v-if="!!errors?.title">
      {{ errors?.title[0] }}
    </div>
  </div>
  <div class="mb-3">
    <label for="taskDescription" class="form-label">Task Description</label>
    <textarea
      v-model="formValues.description"
      class="form-control"
      :class="{ 'is-invalid': !!errors?.description }"
      id="taskDescription"
      rows="3"
      :disabled="isLoading"
    ></textarea>
    <div class="invalid-feedback" v-if="!!errors?.description">
      {{ errors?.description[0] }}
    </div>
  </div>
  <div class="mb-3">
    <label for="taskDescription" class="form-label">Project</label>
    <select
      v-model="formValues.projectId"
      class="form-select"
      :class="{ 'is-invalid': !!errors?.project_id }"
      aria-label="Default select example"
      :disabled="isFetchingProjects || isLoading"
    >
      <option selected disabled :value="0">
        {{ isFetchingProjects ? "Loading..." : "Project" }}
      </option>
      <option :value="project.id" v-for="project in projects" :key="project.id">
        {{ project?.title }}
      </option>
    </select>
    <div class="invalid-feedback" v-if="!!errors?.project_id">
      {{ errors?.project_id[0] }}
    </div>
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
