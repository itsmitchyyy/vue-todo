<script setup lang="ts">
import Navbar from "@/components/molecules/Navbar/Navbar.vue";
import ProjectForm from "@/components/organisms/ProjectForm/ProjectForm.vue";
import { useFetchProjects, useUpdateProject } from "@/composables";
import type { AddProject, Project } from "@/domain/project";
import { ref } from "vue";
import { useMutation, useQuery } from "vue-query";
import { useRouter } from "vue-router";

const props = defineProps<{ id: string }>();

const router = useRouter();
const errors = ref<any>();
const { fetchProject } = useFetchProjects();
const { updateProject } = useUpdateProject();

const { data: project, isFetching: isFetchingProjects } = useQuery(
  ["project", props.id],
  () => {
    return fetchProject(Number(props.id));
  },
  {
    refetchOnMount: true,
  },
);

const { mutate: updateProjectMutationn, isLoading: isUpdatingProject } =
  useMutation(
    (payload: Project) => {
      return updateProject(payload);
    },
    {
      onSuccess: () => router.push("/projects"),
      onError: (error: any) => {
        if (error?.response?.status === 422) {
          errors.value = error.response.data.errors;
        }
      },
    },
  );

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
  updateProjectMutationn(params);
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
