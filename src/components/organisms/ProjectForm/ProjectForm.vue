<script setup lang="ts">
import type { AddProject } from "@/domain/project";
import { reactive, watch } from "vue";
import type { FormProps, TouchedInputProps } from "./types";

const props = defineProps<{
  isLoading?: FormProps["isLoading"];
  project?: FormProps["project"];
  errors?: FormProps["errors"];
}>();

const emits = defineEmits<{
  (e: "onSubmitProject", value: AddProject): void;
  (e: "onTouchedInput", touched: TouchedInputProps): void;
}>();

const formValues = reactive<AddProject>({
  title: "",
  description: "",
});

watch(
  () => [formValues.title, formValues.description],
  () => {
    emits("onTouchedInput", {
      title: !!formValues.title,
      description: !!formValues.description,
    });
  },
);

const unwatch = watch(
  () => props.project,
  () => {
    Object.assign(formValues, props.project);
  },
);

const handleSubmitProject = () => {
  unwatch();
  emits("onSubmitProject", formValues);
};
</script>

<template>
  <div class="mb-3">
    <label for="projectName" class="form-label">Project Name</label>
    <input
      type="text"
      class="form-control"
      :class="{ 'is-invalid': !!errors?.title }"
      id="projectName"
      placeholder="Project Name"
      v-model="formValues.title"
    />
    <div class="invalid-feedback" v-if="!!errors?.title">
      {{ errors?.title[0] }}
    </div>
  </div>
  <div class="mb-3">
    <label for="projectDesciption" class="form-label"
      >Project Description</label
    >
    <textarea
      class="form-control"
      :class="{ 'is-invalid': !!errors?.description }"
      id="projectDesciption"
      v-model="formValues.description"
      rows="3"
    ></textarea>
    <div class="invalid-feedback" v-if="!!errors?.description">
      {{ errors?.description[0] }}
    </div>
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
