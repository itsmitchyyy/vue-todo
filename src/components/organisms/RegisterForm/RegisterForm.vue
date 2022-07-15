<script setup lang="ts">
import { reactive, watch } from "vue";
import type { RegisterFormProps, FormProps, TouchedInputProps } from "./types";

defineProps<{
  errors: FormProps["errors"];
  isLoading?: FormProps["isLoading"];
}>();
const emits = defineEmits<{
  (e: "onSubmitRegister", values: RegisterFormProps): void;
  (e: "onChangeInput", touched: TouchedInputProps): void;
}>();
const formValues = reactive({ name: "", email: "", password: "" });

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
              :class="{ 'is-invalid': !!errors?.name }"
            />
            <div class="invalid-feedback" v-if="!!errors?.name">
              {{ errors?.name[0] }}
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
              :class="{ 'is-invalid': !!errors?.email }"
            />
            <div class="invalid-feedback" v-if="!!errors?.email">
              {{ errors?.email[0] }}
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
              :class="{ 'is-invalid': !!errors?.password }"
              id="inputPassword"
            />
            <div class="invalid-feedback" v-if="!!errors?.password">
              {{ errors?.password[0] }}
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
