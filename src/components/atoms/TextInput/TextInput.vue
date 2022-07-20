<script setup lang="ts">
defineProps<{
  type: "text" | "password";
  label?: string;
  id: any;
  placeholder?: string;
}>();
</script>
<template>
  <div>
    <label v-if="!!label" :for="id" class="form-label">{{ label }}</label>
    <input
      :type="type"
      class="form-control"
      :id="id"
      :placeholder="placeholder"
    />
  </div>
</template>
