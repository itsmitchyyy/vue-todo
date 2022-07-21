<script setup lang="ts">
import { useDeleteTask, useFetchTasks } from "@/composables";
import { useDebounce } from "@vueuse/core";
import moment from "moment";
import { reactive, ref } from "vue";
import { useMutation, useQuery, useQueryClient } from "vue-query";
import Pagination from "../../molecules/Pagination/Pagination.vue";

const queryClient = useQueryClient();

const search = ref();
const paginateParams = reactive({ page: 1, pageSize: 10 });

const debouncedSearch = useDebounce(search, 500);

const { fetchTasks } = useFetchTasks();
const { deleteTask } = useDeleteTask();

const { data: tasks, isFetching: isFetchingTasks } = useQuery(
  ["tasks", debouncedSearch, paginateParams],
  () => {
    return fetchTasks(debouncedSearch.value, paginateParams);
  },
  {
    refetchOnMount: true,
  },
);

const { mutate: deleteTaskMutation, isLoading: isDeletingTask } = useMutation(
  (id: number) => {
    return deleteTask(id);
  },
  {
    onSuccess: () => queryClient.refetchQueries("tasks"),
  },
);

const handleDeleteTask = async (id: number) => {
  deleteTaskMutation(id);
};

const handlePrevPage = () => {
  console.log(tasks.value?.pagination.current_page);
  paginateParams.page = tasks.value?.pagination.current_page
    ? tasks.value?.pagination.current_page - 1
    : 1;
};

const handleNextPage = () => {
  paginateParams.page = tasks.value?.pagination.current_page
    ? tasks.value?.pagination.current_page + 1
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
    <h5>Task List</h5>

    <input
      type="text"
      class="form-control"
      v-model="search"
      placeholder="Search Tasks"
    />

    <template v-if="isFetchingTasks">
      <div>Loading...</div>
    </template>

    <template v-else-if="tasks?.data.length">
      <div class="list-group mt-4">
        <div
          class="list-group-item list-group-item-action"
          aria-current="true"
          v-for="task in tasks.data"
          :key="task.id"
        >
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">Title: {{ task.title }}</h5>
            <small>{{ moment(task.createdAt).fromNow() }}</small>
          </div>
          <p class="mb-1">Task Description: {{ task.description }}</p>
          <small>Project: {{ task.project.title }}</small>
          <div class="mt-1 d-grid gap-2 d-md-block">
            <button
              class="btn btn-primary me-2"
              @click="
                $router.push({ name: 'edit-tasks', params: { id: task.id } })
              "
              :disabled="isDeletingTask"
            >
              Edit
            </button>
            <button
              class="btn btn-danger"
              :disabled="isDeletingTask"
              @click="handleDeleteTask(task.id)"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      <Pagination
        :from="tasks.pagination.from"
        :total-page="tasks.pagination.last_page"
        :page-size="paginateParams.pageSize"
        :total-records="tasks.pagination.total"
        :current-page="tasks.pagination.current_page"
        :to="tasks.pagination.to"
        @next-page="handleNextPage"
        @prev-page="handlePrevPage"
        @on-records-per-page-change="handleChangePageSize"
        @on-change-page-number="handleChangePage"
      />
    </template>

    <template v-else>
      <div>No data found</div>
    </template>
  </div>
</template>
