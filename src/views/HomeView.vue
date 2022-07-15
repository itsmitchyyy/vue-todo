<script setup lang="ts">
import LoginForm, {
  type LoginFormProps,
} from "@/components/Forms/LoginForm.vue";
import { useAuth } from "@/composables/auth";
import { useRouter } from "vue-router";

const { useSignIn, user, errors } = useAuth();
const { signIn, isSigningIn } = useSignIn();
const router = useRouter();

const handleChangeInput = (touched: { email: boolean; password: boolean }) => {
  errors.value = {
    email: touched.email ? "" : errors.value.email,
    password: touched.password ? "" : errors.value.password,
  };
};

const handleSubmitLogin = async (value: LoginFormProps) => {
  const { email, password } = value;
  await signIn(email, password);

  if (user.value?.token && user.value.user) {
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
