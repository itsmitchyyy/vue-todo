<script setup lang="ts">
import { reactive, watch } from "vue";
import type { FormProps, LoginFormProps, TouchedInputProps } from "./types";

defineProps<{ errors?: LoginFormProps; isLoading?: FormProps["isLoading"] }>();
const emits = defineEmits<{
  (e: "onSubmitLogin", values: LoginFormProps): void;
  (e: "onChangeInput", touched: TouchedInputProps): void;
}>();
const formValues = reactive({ email: "", password: "" });

watch(
  () => [formValues.email, formValues.password],
  () => {
    emits("onChangeInput", {
      email: !!formValues.email,
      password: !!formValues.password,
    });
  },
);

const handleSubmitLogin = () => {
  emits("onSubmitLogin", formValues);
};
</script>

<template>
  <div class="login--container">
    <div class="login--form">
      <form>
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
              class="form-control"
              v-model="formValues.password"
              :class="{ 'is-invalid': !!errors?.password }"
              id="inputPassword"
            />
            <div class="invalid-feedback" v-if="!!errors?.password">
              {{ errors?.password[0] }}
            </div>
          </div>
        </div>
        <button
          type="button"
          @click="handleSubmitLogin"
          class="btn btn-primary mb-3 w-100"
          :disabled="isLoading"
        >
          Submit
        </button>
        <div class="d-flex justify-content-center">
          <small
            >Don't have an account? <a href="/register">Register now</a></small
          >
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
