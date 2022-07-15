<script setup lang="ts">
import Navbar from "@/components/molecules/Navbar/Navbar.vue";
import ProjectForm from "@/components/organisms/ProjectForm/ProjectForm.vue";
import type { AddProject } from "@/domain/project";
import { useProject } from "@/composables/projects";
import { useRouter } from "vue-router";
const router = useRouter();

const { useAddProject, errors, isSuccess } = useProject();
const { addProject, isAddingProject } = useAddProject();

const handleTouchedInput = (touched: {
  title: boolean;
  description: boolean;
}) => {
  errors.value = {
    title: touched.title ? "" : errors.value?.title,
    description: touched.description ? "" : errors.value?.description,
  };
};

const handleSubmitProject = async (value: AddProject) => {
  await addProject(value);

  if (isSuccess.value) {
    router.push("/projects");
  }
};
</script>

<template>
  <Navbar />
  <div class="container mx-auto mt-5">
    <div class="projects--container">
      <div class="projects-form">
        <ProjectForm
          :errors="errors"
          :is-loading="isAddingProject"
          @on-submit-project="handleSubmitProject"
          @on-touched-input="handleTouchedInput"
        />
      </div>
    </div>
  </div>
</template>

<style>
.projects {
  &--container {
    display: flex;
    justify-content: center;
    margin: auto;

    .projects-form {
      min-width: 500px;
      border-radius: 10px;
      border: 1px solid var(--vt-c-divider-light-1);
      padding: 1em;
    }
  }
}
</style>
