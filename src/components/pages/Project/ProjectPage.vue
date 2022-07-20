<script setup lang="ts">
import Navbar from "@/components/molecules/Navbar/Navbar.vue";
import ProjectLists from "@/components/templates/ProjectList/ProjectList.vue";
import IconPlus from "@/components/atoms/Icons/IconPlus.vue";
</script>

<template>
  <Navbar />
  <div class="container mx-auto mt-5">
    <div>
      <button
        @click="$router.push('/projects/add-projects')"
        class="btn btn-custom-style btn-outline-primary"
      >
        <span class="btn-label"><IconPlus /></span>Add Project
      </button>

      <div class="d-flex mt-5">
        <ProjectLists />
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
