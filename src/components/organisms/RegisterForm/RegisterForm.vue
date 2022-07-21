<script setup lang="ts">
import { reactive, watch } from "vue";
import type { RegisterFormProps, FormProps, TouchedInputProps } from "./types";
import { RegisterFormSchema } from "./validation";
import { Form, Field } from "vee-validate";

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

const handleSubmitRegister = (values: any) => {
  emits("onSubmitRegister", values);
};
</script>

<template>
  <div class="login--container">
    <div class="login--form">
      <Form
        @submit="handleSubmitRegister"
        :initial-values="formValues"
        :validation-schema="RegisterFormSchema"
        v-slot="{ errors: formErrors }"
      >
        <div class="mb-3">
          <label for="staticEmail" class="col-sm-2 col-form-label">Name</label>
          <div class="col">
            <Field
              type="text"
              name="name"
              class="form-control"
              :class="{ 'is-invalid': !!errors?.name || formErrors?.name }"
            />
            <div class="invalid-feedback">
              {{ errors?.name?.[0] || formErrors?.name }}
            </div>
          </div>
        </div>
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
              {{ errors?.email?.[0] || formErrors?.email }}
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
              name="password"
              class="form-control"
              :class="{
                'is-invalid': !!errors?.password || formErrors?.password,
              }"
              id="inputPassword"
            />
            <div class="invalid-feedback">
              {{ errors?.password?.[0] || formErrors?.email }}
            </div>
          </div>
        </div>
        <button :disabled="isLoading" class="btn btn-primary mb-3 w-100">
          Submit
        </button>
        <div class="d-flex justify-content-center">
          <small>Already have an account? <a href="/login">Login now</a></small>
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
