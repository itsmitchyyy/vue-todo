<script setup lang="ts">
import EditTask from "../../templates/EditTask/EditTask.vue";

defineProps<{ id: string }>();
</script>
<template>
  <EditTask :id="id" />
</template>
