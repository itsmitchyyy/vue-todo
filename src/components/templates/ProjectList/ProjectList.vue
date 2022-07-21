<script setup lang="ts">
import { useDeleteProject, useFetchProjects } from "@/composables";
import { useDebounce } from "@vueuse/core";
import moment from "moment";
import { reactive, ref } from "vue";
import { useMutation, useQuery, useQueryClient } from "vue-query";
import Pagination from "../../molecules/Pagination/Pagination.vue";

const queryClient = useQueryClient();
const { fetchProjects } = useFetchProjects();
const { deleteProject } = useDeleteProject();

const search = ref();
const paginateParams = reactive({ page: 1, pageSize: 10 });

const debouncedSearch = useDebounce(search, 500);

const { data: projects, isFetching: isFetchingProjects } = useQuery(
  ["projects", debouncedSearch, paginateParams],
  () => {
    return fetchProjects(debouncedSearch.value, paginateParams);
  },
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

const handlePrevPage = () => {
  console.log(projects.value?.pagination.current_page);
  paginateParams.page = projects.value?.pagination.current_page
    ? projects.value?.pagination.current_page - 1
    : 1;
};

const handleNextPage = () => {
  paginateParams.page = projects.value?.pagination.current_page
    ? projects.value?.pagination.current_page + 1
    : 1;
};

const handleChangePageSize = (size: number) => {
  paginateParams.pageSize = size;
};

const handleChangePage = (size: number) => {
  paginateParams.page = size;
};
</script>

<template>
  <div class="d-flex flex-column w-100">
    <h5>Project List</h5>

    <input
      type="text"
      class="form-control"
      v-model="search"
      placeholder="Search Projects"
    />

    <template v-if="isFetchingProjects">
      <div>Loading...</div>
    </template>
    <template v-else-if="projects?.data.length">
      <div class="list-group mt-4">
        <div
          class="list-group-item list-group-item-action"
          aria-current="true"
          v-for="project in projects?.data"
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
      <Pagination
        :from="projects.pagination.from"
        :total-page="projects.pagination.last_page"
        :page-size="paginateParams.pageSize"
        :total-records="projects.pagination.total"
        :current-page="projects.pagination.current_page"
        :to="projects.pagination.to"
        @next-page="handleNextPage"
        @prev-page="handlePrevPage"
        @on-records-per-page-change="handleChangePageSize"
        @on-change-page-number="handleChangePage"
      />
    </template>
    <template v-else>
      <div>No Data Found</div>
    </template>
  </div>
</template>
