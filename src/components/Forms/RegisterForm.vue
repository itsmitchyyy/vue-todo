<script setup lang="ts">
import { computed, reactive, watch } from "vue";

export type FormProps = {
  name: string;
  email: string;
  password: string;
};

const props = defineProps<{
  errors: { name?: string; email: string; password: string };
  isLoading?: boolean;
}>();
const emits = defineEmits<{
  (e: "onSubmitRegister", values: FormProps): void;
  (
    e: "onChangeInput",
    touched: { email: boolean; name: boolean; password: boolean },
  ): void;
}>();
const formValues = reactive({ name: "", email: "", password: "" });
const computedErrors = computed(() => props.errors);

watch(
  () => [formValues.email, formValues.name, formValues.password],
  () => {
    emits("onChangeInput", {
      email: !!formValues.email,
      name: !!formValues.name,
      password: !!formValues.password,
    });
  },
);

const handleSubmitRegister = () => {
  emits("onSubmitRegister", formValues);
};
</script>

<template>
  <div class="login--container">
    <div class="login--form">
      <form>
        <div class="mb-3">
          <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
          <div class="col">
            <input
              type="text"
              v-model="formValues.name"
              class="form-control"
              :class="{ 'is-invalid': !!computedErrors.name }"
            />
            <div class="invalid-feedback" v-if="!!computedErrors.name">
              {{ computedErrors.name[0] }}
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col">
            <input
              type="text"
              v-model="formValues.email"
              class="form-control"
              :class="{ 'is-invalid': !!computedErrors.email }"
            />
            <div class="invalid-feedback" v-if="!!computedErrors.email">
              {{ computedErrors.email[0] }}
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="col-sm-2 col-form-label"
            >Password</label
          >
          <div class="col">
            <input
              type="password"
              v-model="formValues.password"
              class="form-control"
              :class="{ 'is-invalid': !!computedErrors.password }"
              id="inputPassword"
            />
            <div class="invalid-feedback" v-if="!!computedErrors.password">
              {{ computedErrors.password[0] }}
            </div>
          </div>
        </div>
        <button
          :disabled="isLoading"
          type="button"
          @click="handleSubmitRegister"
          class="btn btn-primary mb-3 w-100"
        >
          Submit
        </button>
        <div class="d-flex justify-content-center">
          <small>Already have an account? <a href="/login">Login now</a></small>
        </div>
      </form>
    </div>
  </div>
</template>

<style>
.login {
  &--container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  &--form {
    width: 500px;
    border-radius: 10px;
    border: 1px solid var(--vt-c-divider-light-1);
    padding: 1em;
  }
}
</style>
