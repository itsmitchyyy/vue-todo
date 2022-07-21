<script setup lang="ts">
import type { AddProject } from "@/domain/project";
import { reactive, watch } from "vue";
import type { FormProps, TouchedInputProps } from "./types";
import { Form, Field } from "vee-validate";
import { AddProjectSchema } from "./validation";

const props = defineProps<{
  isLoading?: FormProps["isLoading"];
  project?: FormProps["project"];
  errors?: FormProps["errors"];
}>();

const emits = defineEmits<{
  (e: "onSubmitProject", value: AddProject): void;
  (e: "onTouchedInput", touched: TouchedInputProps): void;
}>();

const formValues = reactive({ title: "", description: "" });

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

const handleSubmitProject = (values: any) => {
  unwatch();
  emits("onSubmitProject", values);
};
</script>

<template>
  <Form
    @submit="handleSubmitProject"
    :validation-schema="AddProjectSchema"
    :initial-values="formValues"
    v-slot="{ errors: formErrors }"
  >
    <div class="mb-3">
      <label for="projectName" class="form-label">Project Name</label>
      <Field
        type="text"
        class="form-control"
        :class="{ 'is-invalid': !!errors?.title || formErrors?.title }"
        id="projectName"
        placeholder="Project Name"
        name="title"
      />
      <div class="invalid-feedback">
        {{ errors?.title[0] || formErrors?.title }}
      </div>
    </div>
    <div class="mb-3">
      <label for="projectDesciption" class="form-label"
        >Project Description</label
      >
      <Field
        as="textarea"
        class="form-control"
        :class="{
          'is-invalid': !!errors?.description || formErrors?.description,
        }"
        id="projectDesciption"
        name="description"
        rows="3"
      />
      <div class="invalid-feedback">
        {{ errors?.description?.[0] || formErrors?.title }}
      </div>
    </div>
    <div>
      <button class="btn btn-primary w-100" :disabled="isLoading">
        Submit
      </button>
    </div>
  </Form>
</template>
