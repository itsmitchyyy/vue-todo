<script lang="ts">
export default { name: "PaginationComponent" };
</script>
<script setup lang="ts">
import PaginationRightArrow from "../../atoms/Icons/PaginationRightArrow.vue";
import PaginationLeftArrow from "../../atoms/Icons/PaginationLeftArrow.vue";

defineProps<{
  pageSize: number;
  totalPage: number;
  totalRecords: number;
  currentPage: number;
  from: number;
  to: number;
}>();

const emits = defineEmits<{
  (e: "nextPage"): void;
  (e: "prevPage"): void;
  (e: "onRecordsPerPageChange", size: number): void;
  (e: "onChangePageNumber", size: number): void;
}>();

const handleChangeSizePerPage = (e: InputEvent) => {
  const value = (e.target as HTMLInputElement).value;
  emits("onRecordsPerPageChange", Number(value));
};

const handleChangePage = (e: InputEvent) => {
  const value = (e.target as HTMLInputElement).value;
  emits("onChangePageNumber", Number(value));
};
</script>
<template>
  <div class="pagination-container">
    <div class="records-per-page">
      Records per page:
      <select
        class="select-dropdown"
        :value="pageSize"
        :onchange="handleChangeSizePerPage"
      >
        <option :value="10">10</option>
        <option :value="20">20</option>
        <option :value="50">50</option>
        <option :value="100">100</option>
      </select>
    </div>
    <div class="no-of records">
      {{ from }} - {{ to }} of {{ totalRecords }} Records
    </div>
    <div class="no-of pages">
      <select
        class="select-dropdown me-3"
        :value="currentPage"
        :onchange="handleChangePage"
      >
        <option :value="item" v-for="(item, index) in totalPage" :key="index">
          {{ item }}
        </option>
      </select>
      <span>{{ currentPage }} of {{ totalPage }} pages</span>
    </div>
    <div class="paginate-content">
      <ul class="pagination m-0">
        <li class="page-item">
          <a
            href="#"
            class="page-link"
            :class="{ disabled: currentPage === 1 }"
            @click.prevent="$emit('prevPage')"
            ><PaginationRightArrow
          /></a>
        </li>
        <li class="page-item">
          <a
            href="#"
            class="page-link"
            :class="{ disabled: totalPage === currentPage }"
            @click.prevent="$emit('nextPage')"
            ><PaginationLeftArrow
          /></a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style>
.pagination-container {
  background: #fff8ef;
  display: flex;
  flex-direction: row;
  border-top: 2px solid #fec483;

  .select-dropdown {
    cursor: pointer;
    background: #fff8ef;
    border: 0;
    font-weight: 400;
    font-size: 13px;
    line-height: 18px;
  }

  .records-per-page {
    padding: 1em 0.5em;
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    border-right: 2px solid #fec483;
  }

  .no-of {
    padding: 1em 0.5em;
    display: flex;
    flex-direction: row;
    border-right: 2px solid #fec483;

    &.records {
      flex: 1;
    }
  }

  .paginate-content {
    padding: 0 0.5em;
    display: flex;

    .page-item {
      background: #fff8ef;
      display: flex;
      align-items: center;

      &:first-of-type {
        border-right: 2px solid #fec483;
      }

      .page-link {
        background: #fff8ef;
        border: 0;
        outline: none;

        &:focus {
          box-shadow: none;
        }
      }

      &:not(:first-child) {
        .page-link {
          margin: 0;
        }
      }
    }
  }
}
</style>
