<script lang="ts">
export default { name: "LoginTemplate" };
</script>
<script setup lang="ts">
import LoginForm from "@/components/organisms/LoginForm/LoginForm.vue";
import type { LoginFormProps } from "@/components/organisms/LoginForm/types";
import { useSignIn } from "@/composables";
import { useAuthStore } from "@/stores/auth/auth";
import { ref } from "vue";
import { useMutation } from "vue-query";
import { useRouter } from "vue-router";

const errors = ref<any>();
const { signIn } = useSignIn();
const { setCurrentUser } = useAuthStore();

const router = useRouter();

const { mutate: signInMutation, isLoading: isSigningIn } = useMutation(
  (payload: { email: string; password: string }) => {
    const { email, password } = payload;
    return signIn(email, password);
  },
  {
    onSuccess: (data) => {
      setCurrentUser(data);
      router.push("/tasks");
    },
    onError: (error: any) => {
      if (error?.response?.status === 422) {
        errors.value = error.response.data.errors;
      }
    },
  },
);

const handleChangeInput = (touched: { email: boolean; password: boolean }) => {
  errors.value = {
    email: touched.email ? "" : errors.value?.email,
    password: touched.password ? "" : errors.value?.password,
  };
};

const handleSubmitLogin = (value: LoginFormProps) => {
  signInMutation(value);
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
