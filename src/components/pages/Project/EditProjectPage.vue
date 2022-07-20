<script setup lang="ts">
import EditProject from "../../templates/EditProject/EditProject.vue";

defineProps<{ id: string }>();
</script>
<template>
  <EditProject :id="id" />
</template>
