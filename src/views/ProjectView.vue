<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";
import { useRouter } from "vue-router";
import ProjectLists from "../components/ProjectLists.vue";
import IconPlus from "../components/icons/IconPlus.vue";
import { useProject } from "@/composables/projects";
import { onMounted } from "vue";

const router = useRouter();

const { useFetchProjects, useDeleteProject, projects } = useProject();
const { fetchProjects, isFetchingProjects } = useFetchProjects();
const { deleteProject, isDeletingProject } = useDeleteProject();

onMounted(fetchProjects);

const handleDeleteProject = async (id: number) => {
  await deleteProject(id);
};
</script>

<template>
  <Navbar />
  <div class="container mx-auto mt-5">
    <div>
      <button
        @click="router.push('/projects/add-projects')"
        class="btn btn-custom-style btn-outline-primary"
      >
        <span class="btn-label"><IconPlus /></span>Add Project
      </button>

      <div class="d-flex mt-5">
        <ProjectLists
          :is-loading="isFetchingProjects"
          :is-deleting="isDeletingProject"
          :projects="projects"
          @on-delete-project="handleDeleteProject"
        />
      </div>
    </div>
  </div>
</template>

<style>
.btn-custom-style {
  .btn-label {
    display: inline-flex;
    margin-right: 0.5em;

    svg {
      height: 12px;
      width: 15px;

      path {
        fill: var(--bs-btn-color);
      }
    }
  }

  &:hover {
    .btn-label {
      svg {
        path {
          fill: var(--vt-c-white);
        }
      }
    }
  }
}
</style>
