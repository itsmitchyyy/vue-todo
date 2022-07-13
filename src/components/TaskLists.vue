<script setup lang="ts">
import type { Task } from "@/domain/task";
import moment from "moment";

defineProps<{ tasks: Task[]; isLoading?: boolean }>();
</script>

<template>
  <div class="d-flex flex-column w-100">
    <h5>Task List</h5>

    <template v-if="isLoading">
      <div>Loading...</div>
    </template>

    <template v-else-if="tasks.length">
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
            <button class="btn btn-primary me-2">Edit</button>
            <button class="btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </template>

    <template v-else>
      <div>No Data Found</div>
    </template>
  </div>
</template>
