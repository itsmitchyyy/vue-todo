<script setup lang="ts">
import RegisterForm from "@/components/Forms/RegisterForm.vue";
import type { FormProps } from "@/components/Forms/RegisterForm.vue";
import { useAuth } from "@/composables/auth";
import { useRouter } from "vue-router";
const { useSignUp, errors, user } = useAuth();
const { signUp, isSigningUp } = useSignUp();

const router = useRouter();

const handleChangeInput = (touched: {
  email: boolean;
  name: boolean;
  password: boolean;
}) => {
  errors.value = {
    email: touched.email ? "" : errors.value.email,
    name: touched.name ? "" : errors.value.name,
    password: touched.password ? "" : errors.value.password,
  };
};

const handleSubmitRegister = async (value: FormProps) => {
  await signUp(value);

  if (user.value?.token && user.value.user) {
    router.push("/tasks");
  }
};
</script>

<template>
  <RegisterForm
    :errors="errors"
    @on-change-input="handleChangeInput"
    @on-submit-register="handleSubmitRegister"
    :is-loading="isSigningUp"
  />
</template>
