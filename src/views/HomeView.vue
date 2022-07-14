<script setup lang="ts">
import LoginForm, {
  type LoginFormProps,
} from "@/components/Forms/LoginForm.vue";
import { useAuth } from "@/composables/auth";
import { useRouter } from "vue-router";

const { useSignIn, authStore } = useAuth();
const { signIn, isSigningIn, errors, setErrors } = useSignIn();
const router = useRouter();

const handleChangeInput = (touched: { email: boolean; password: boolean }) => {
  const errorValue = {
    email: touched.email ? "" : errors.value.email,
    password: touched.password ? "" : errors.value.password,
  };
  setErrors(errorValue);
};

const handleSubmitLogin = async (value: LoginFormProps) => {
  const { email, password } = value;
  await signIn(email, password);

  if (authStore?.getUser && authStore.getToken) {
    router.push("/tasks");
  }
};
</script>

<template>
  <LoginForm
    :errors="errors"
    :is-loading="isSigningIn"
    @on-change-input="handleChangeInput"
    @on-submit-login="handleSubmitLogin"
  />
</template>
