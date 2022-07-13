<script setup lang="ts">
import RegisterForm from "@/components/Forms/RegisterForm.vue";
import type { FormProps } from "@/components/Forms/RegisterForm.vue";
import { useAuth } from "@/composables/auth";
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
const { useSignUp } = useAuth();
const { errors, setErrors, signUp } = useSignUp();
const authStore = useAuthStore();

const router = useRouter();

const handleChangeInput = (touched: {
  email: boolean;
  name: boolean;
  password: boolean;
}) => {
  const errorValue = {
    email: touched.email ? "" : errors.value.email,
    name: touched.name ? "" : errors.value.name,
    password: touched.password ? "" : errors.value.password,
  };
  setErrors(errorValue);
};

const handleSubmitRegister = async (value: FormProps) => {
  await signUp(value);

  if (authStore.getToken && authStore.getUser) {
    router.push("/tasks");
  }
};
</script>

<template>
  <RegisterForm
    :errors="errors"
    @on-change-input="handleChangeInput"
    @on-submit-register="handleSubmitRegister"
  />
</template>
