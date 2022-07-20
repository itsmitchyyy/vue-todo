<script setup lang="ts">
import { useFetchProjects } from "@/composables/";
import { reactive, watch } from "vue";
import type { AddTask, Task } from "@/domain/task";
import type { FormProps, TouchedInputProps } from "./types";
import { useQuery } from "vue-query";
import { Form, Field } from "vee-validate";
import { AddTaskSchema } from "./validation";

const props = defineProps<{
  isLoading?: FormProps["isLoading"];
  task?: Task;
  errors?: FormProps["errors"];
}>();
const emits = defineEmits<{
  (e: "onSubmitTask", value: AddTask): void;
  (e: "onTouchedInput", touched: TouchedInputProps): void;
}>();

const initialValues = { title: "", description: "", projectId: 0 };
const formValues = reactive(initialValues);

const unwatch = watch(
  () => props.task,
  () => {
    Object.assign(formValues, {
      ...props.task,
      projectId: props.task?.project.id,
    });
  },
);

const { fetchProjects } = useFetchProjects();

const { data: projects, isFetching: isFetchingProjects } = useQuery(
  "projects",
  () => fetchProjects(),
  {
    refetchOnMount: true,
  },
);

const handleSubmitTask = (values: any) => {
  unwatch();
  emits("onSubmitTask", values);
};
</script>

<template>
  <Form
    @submit="handleSubmitTask"
    :validation-schema="AddTaskSchema"
    :initial-values="formValues"
    v-slot="{ errors: formErrors }"
  >
    <div class="mb-3">
      <label for="taskName" class="form-label">Task Name</label>
      <Field
        type="text"
        class="form-control"
        :class="{ 'is-invalid': !!errors?.title || formErrors.title }"
        id="taskName"
        placeholder="Task Name"
        name="title"
        :disabled="isLoading"
      />
      <div class="invalid-feedback">
        {{ errors?.title[0] || formErrors?.title }}
      </div>
    </div>
    <div class="mb-3">
      <label for="taskDescription" class="form-label">Task Description</label>
      <Field
        as="textarea"
        name="description"
        class="form-control"
        :class="{
          'is-invalid': !!errors?.description || formErrors.description,
        }"
        id="taskDescription"
        rows="3"
        :disabled="isLoading"
      />
      <div class="invalid-feedback">
        {{ errors?.description?.[0] || formErrors.description }}
      </div>
    </div>
    <div class="mb-3">
      <label for="taskDescription" class="form-label">Project</label>
      <Field
        as="select"
        name="projectId"
        class="form-select"
        :class="{ 'is-invalid': !!errors?.project_id || formErrors.projectId }"
        aria-label="Default select example"
        :disabled="isFetchingProjects || isLoading"
      >
        <option selected disabled :value="0">
          {{ isFetchingProjects ? "Loading..." : "Project" }}
        </option>
        <option
          v-for="project in projects"
          :value="project.id"
          :key="project.id"
        >
          {{ project?.title }}
        </option>
      </Field>
      <div class="invalid-feedback">
        {{ errors?.project_id[0] || formErrors.projectId }}
      </div>
    </div>
    <div>
      <button
        class="btn btn-primary w-100"
        :disabled="isFetchingProjects || isLoading"
      >
        Submit
      </button>
    </div>
  </Form>
</template>
