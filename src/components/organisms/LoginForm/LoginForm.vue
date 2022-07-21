<script setup lang="ts">
import { reactive, watch } from "vue";
import type { FormProps, LoginFormProps, TouchedInputProps } from "./types";
import { LoginFormSchema } from "./validation";
import { Form, Field } from "vee-validate";

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

const handleSubmitLogin = (values: any) => {
  emits("onSubmitLogin", values);
};
</script>

<template>
  <div class="login--container">
    <div class="login--form">
      <Form
        @submit="handleSubmitLogin"
        :validation-schema="LoginFormSchema"
        :initial-values="formValues"
        v-slot="{ errors: formErrors }"
      >
        <div class="mb-3">
          <label for="staticEmail" class="col-sm-2 col-form-label">Email</label>
          <div class="col">
            <Field
              type="text"
              name="email"
              class="form-control"
              :class="{ 'is-invalid': !!errors?.email || formErrors?.email }"
            />
            <div class="invalid-feedback">
              {{ errors?.email[0] || formErrors?.email }}
            </div>
          </div>
        </div>
        <div class="mb-3">
          <label for="inputPassword" class="col-sm-2 col-form-label"
            >Password</label
          >
          <div class="col">
            <Field
              type="password"
              class="form-control"
              name="password"
              :class="{
                'is-invalid': !!errors?.password || formErrors?.password,
              }"
              id="inputPassword"
            />
            <div class="invalid-feedback">
              {{ errors?.password?.[0] || formErrors?.password }}
            </div>
          </div>
        </div>
        <button class="btn btn-primary mb-3 w-100" :disabled="isLoading">
          Submit
        </button>
        <div class="d-flex justify-content-center">
          <small
            >Don't have an account? <a href="/register">Register now</a></small
          >
        </div>
      </Form>
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
