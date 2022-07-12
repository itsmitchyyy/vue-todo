<template>
  <div class="d-flex flex-column w-100">
    <h5>Task List</h5>

    <div class="list-group mt-4">
      <div class="list-group-item list-group-item-action" aria-current="true">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">List group item heading</h5>
          <small>3 days ago</small>
        </div>
        <p class="mb-1">Some placeholder content in a paragraph.</p>
        <small>And some small print.</small>
        <div class="mt-1 d-grid gap-2 d-md-block">
          <button class="btn btn-primary me-2">Edit</button>
          <button class="btn btn-danger">Delete</button>
        </div>
      </div>
      <div class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">List group item heading</h5>
          <small class="text-muted">3 days ago</small>
        </div>
        <p class="mb-1">Some placeholder content in a paragraph.</p>
        <small class="text-muted">And some muted small print.</small>
      </div>
      <div class="list-group-item list-group-item-action">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">List group item heading</h5>
          <small class="text-muted">3 days ago</small>
        </div>
        <p class="mb-1">Some placeholder content in a paragraph.</p>
        <small class="text-muted">And some muted small print.</small>
      </div>
    </div>
  </div>
</template>
