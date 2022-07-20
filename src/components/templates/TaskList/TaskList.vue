<script setup lang="ts">
import { useDeleteTask, useFetchTasks } from "@/composables";
import { useDebounce } from "@vueuse/core";
import moment from "moment";
import { ref } from "vue";
import { useMutation, useQuery, useQueryClient } from "vue-query";

const queryClient = useQueryClient();

const search = ref();

const debouncedSearch = useDebounce(search, 500);

const { fetchTasks } = useFetchTasks();
const { deleteTask } = useDeleteTask();

const { data: tasks, isFetching: isFetchingTasks } = useQuery(
  ["tasks", debouncedSearch],
  () => {
    return fetchTasks(debouncedSearch.value);
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

    <template v-else-if="tasks?.length">
      <div class="list-group mt-4">
        <div
          class="list-group-item list-group-item-action"
          aria-current="true"
          v-for="task in tasks"
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
    </template>

    <template v-else>
      <div>No Data Found</div>
    </template>
  </div>
</template>
