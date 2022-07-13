<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import ProjectForm from "@/components/Forms/ProjectForm.vue";
import type { AddProject } from "@/domain/project";
import { useProject } from "@/composables/projects";
import { useRouter } from "vue-router";
import { onMounted } from "vue";

const props = defineProps<{ id: string }>();

const router = useRouter();
const { useFetchProjects, useUpdateProject, projectStore } = useProject();
const { fetchProject, isFetchingProjects } = useFetchProjects();
const { updateProject, isUpdatingProject } = useUpdateProject();

onMounted(fetchProject(String(props.id)) as any);

const handleSubmitProject = async (value: AddProject) => {
  const params = { id: Number(props.id), ...value };
  await updateProject(params);

  router.push("/projects");
};
</script>

<template>
  <Navbar />
  <div class="container mx-auto mt-5">
    <div class="projects--container">
      <div class="projects-form">
        <ProjectForm
          :is-loading="isFetchingProjects || isUpdatingProject"
          :project="projectStore.project"
          @on-submit-project="handleSubmitProject"
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
