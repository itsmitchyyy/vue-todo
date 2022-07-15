<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import ProjectForm from "@/components/organisms/ProjectForm/ProjectForm.vue";
import type { AddProject } from "@/domain/project";
import { useProject } from "@/composables/projects";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const props = defineProps<{ id: string }>();

const router = useRouter();
const { useFetchProjects, useUpdateProject, project, errors, isSuccess } =
  useProject();
const { fetchProject, isFetchingProjects } = useFetchProjects();
const { updateProject, isUpdatingProject } = useUpdateProject();

onMounted(fetchProject(String(props.id)) as any);

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
  const params = { id: Number(props.id), ...value };
  await updateProject(params);

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
          :is-loading="isFetchingProjects || isUpdatingProject"
          :project="project"
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
