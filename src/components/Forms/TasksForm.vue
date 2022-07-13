<template>
  <div class="mb-3">
    <label for="taskName" class="form-label">Task Name</label>
    <input
      type="text"
      class="form-control"
      id="taskName"
      placeholder="Task Name"
    />
  </div>
  <div class="mb-3">
    <label for="taskDescription" class="form-label">Task Description</label>
    <textarea class="form-control" id="taskDescription" rows="3"></textarea>
  </div>
  <div class="mb-3">
    <label for="taskDescription" class="form-label">Project</label>
    <select class="form-select" aria-label="Default select example">
      <option selected>Open this select menu</option>
      <option value="1">One</option>
      <option value="2">Two</option>
      <option value="3">Three</option>
    </select>
  </div>
  <div>
    <button type="button" class="btn btn-primary w-100">Submit</button>
  </div>
</template>
