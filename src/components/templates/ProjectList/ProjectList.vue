<script setup lang="ts">
import { useDeleteProject, useFetchProjects } from "@/composables";
import moment from "moment";
import { useMutation, useQuery, useQueryClient } from "vue-query";

const queryClient = useQueryClient();
const { fetchProjects } = useFetchProjects();
const { deleteProject } = useDeleteProject();

const { data: projects, isFetching: isFetchingProjects } = useQuery(
  "projects",
  fetchProjects,
  { refetchOnMount: true },
);

const { mutate: deleteTaskMutation, isLoading: isDeletingTask } = useMutation(
  (id: number) => {
    return deleteProject(id);
  },
  {
    onSuccess: () => queryClient.refetchQueries("projects"),
  },
);

const handleDeleteProject = (id: number) => {
  deleteTaskMutation(id);
};
</script>

<template>
  <div class="d-flex flex-column w-100">
    <h5>Project List</h5>

    <template v-if="isFetchingProjects">
      <div>Loading...</div>
    </template>
    <template v-else-if="projects?.length">
      <div class="list-group mt-4">
        <div
          class="list-group-item list-group-item-action"
          aria-current="true"
          v-for="project in projects"
          :key="project.id"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">{{ project.title }}</h5>
            <small>{{ moment(project.createdAt).fromNow() }}</small>
          </div>
          <p class="mb-1">{{ project.description }}</p>
          <div class="mt-1 d-grid gap-2 d-md-block">
            <button
              class="btn btn-primary me-2"
              @click="
                $router.push({
                  name: 'edit-projects',
                  params: { id: project.id },
                })
              "
              :disabled="isDeletingTask"
            >
              Edit
            </button>
            <button
              class="btn btn-danger"
              :disabled="isDeletingTask"
              @click="handleDeleteProject(project.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div>No data found</div>
    </template>
  </div>
</template>
