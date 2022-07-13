<script setup lang="ts">
import type { AddProject, Project } from "@/domain/project";
import { reactive, watch } from "vue";

const props = defineProps<{ isLoading?: boolean; project?: Project }>();
const emits = defineEmits<{
  (e: "onSubmitProject", value: AddProject): void;
}>();

const formValues = reactive<AddProject>({
  title: "",
  description: "",
});

watch(
  () => props.project,
  () => {
    Object.assign(formValues, props.project);
  },
);

const handleSubmitProject = () => {
  emits("onSubmitProject", formValues);
};
</script>

<template>
  <div class="mb-3">
    <label for="projectName" class="form-label">Project Name</label>
    <input
      type="text"
      class="form-control"
      id="projectName"
      placeholder="Project Name"
      v-model="formValues.title"
    />
  </div>
  <div class="mb-3">
    <label for="projectDesciption" class="form-label"
      >Project Description</label
    >
    <textarea
      class="form-control"
      id="projectDesciption"
      v-model="formValues.description"
      rows="3"
    ></textarea>
  </div>
  <div>
    <button
      type="button"
      class="btn btn-primary w-100"
      :disabled="isLoading"
      @click="handleSubmitProject"
    >
      Submit
    </button>
  </div>
</template>
